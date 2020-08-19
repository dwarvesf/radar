package handler

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"regexp"
	"strconv"
	"strings"

	"github.com/jaytaylor/html2text"
	"golang.org/x/net/html"

	"github.com/mkhoi1998/mimir/consts"
	"github.com/mkhoi1998/mimir/service/google"
	"github.com/mkhoi1998/mimir/service/similar"
	"github.com/mkhoi1998/mimir/service/stackoverflow"
	"github.com/mkhoi1998/mimir/service/textrank"
	"github.com/mkhoi1998/mimir/service/tfidf"
)

// ExtractKeywords return the keywords from input question
func ExtractKeywords(args string) []string {
	if len(args) == 0 {
		return nil
	}
	return textrank.ExtractKeywords(args)
}

// SummarizeStackWiki return the summarized content of stack wiki
func SummarizeStackWiki(keyword string) string {
	tag, isTag := stackoverflow.CheckTagFromKeyword(keyword)
	if !isTag {
		return ""
	}

	wiki, err := html2text.FromString(stackoverflow.GetWikiFromTag(tag))
	if err != nil {
		return ""
	}
	res := strings.Join(textrank.ExtractSentences(wiki, 2), "")
	return strings.ReplaceAll(res, "*", "")
}

// ExtractStackWiki return body of the specified header of the stack wiki
func ExtractStackWiki(keywords []string) string {
	tag, isTag := stackoverflow.CheckTagFromKeyword(keywords[0])
	header := keywords[1]
	if !isTag {
		tag, isTag = stackoverflow.CheckTagFromKeyword(keywords[1])
		if !isTag {
			return ""
		}
		header = keywords[0]
	}

	wiki, err := html2text.FromString(stackoverflow.GetWikiFromTag(tag))
	if err != nil {
		return ""
	}

	h := similar.GetMostSimilar(header, extractHeaders(wiki))
	if h == "" {
		return h
	}

	var body string
	parts := extractBody(wiki)
	for j := range parts {
		if parts[j] == h {
			body = parts[j+1]
			break
		}
	}

	return body
}

// SummarizeStackoverflow return the summarized contents of the answer from Stackoverflow
func SummarizeStackoverflow(keywords []string) string {
	ans, link := stackoverflow.GetAnswerFromSearch(keywords)
	if ans == "" {
		return ans
	}
	return summarizeCodeContent(strings.Split(ans, "<hr")[0], link)
}

// SummarizeGoogle return the summarized content of the web page or the link gotten by Google
func SummarizeGoogle(args []string) string {
	link := google.SearchGoogle(args)
	if link == "" {
		return ""
	}
	var res string

	if strings.Contains(link, "stackoverflow.com") {
		return summarizeStackoverflowLink(link)
	}

	// currently hard code for youtube
	if strings.Contains(link, "youtube.com") {
		return link
	}

	content := google.GetContent(link)
	if strings.Contains(content, "<code>") {
		res = summarizeCodeContent(content, "")
	}

	if res == "" {
		res = summarizeContent(content)
	}

	res = fmt.Sprintf("%v\n\n%v", res, consts.ParseLink(link))
	return res
}

func summarizeStackoverflowLink(link string) string {
	s := strings.Split(link, "/")
	id, err := strconv.Atoi(s[4])
	if err != nil {
		return ""
	}

	ans, _ := stackoverflow.GetAnswerFromQuestionID(id)
	if ans == "" {
		return consts.ParseLink(link)
	}

	return summarizeCodeContent(strings.Split(ans, "<hr")[0], link)
}

func summarizeCodeContent(content, link string) string {
	codes, err := extractTag(content, "code")
	if err == nil {
		return extractCode(codes, content, link)
	}
	// content does not have tag code
	res, err := html2text.FromString(content)
	if err != nil {
		return ""
	}

	// remove quote symbols for clearer display
	res = strings.TrimSpace(strings.ReplaceAll(res, "\n>", ""))

	// if body is too long then just return the link
	if len(strings.Split(res, "\n\n")) > 5 {
		if link != "" {
			return consts.ParseLink(link)
		}
		return link
	}
	return res
}

func extractTag(content, tag string) ([]string, error) {
	doc, err := html.Parse(strings.NewReader(content))
	if err != nil {
		return nil, err
	}

	var code []string
	var crawler func(*html.Node)
	crawler = func(node *html.Node) {
		if node.Type == html.ElementNode && node.Data == tag {
			for parent := node; parent != nil; parent = parent.Parent {
				if parent.Data == "blockquote" {
					return
				}
			}
			code = append(code, html.UnescapeString(strings.TrimSpace(renderNode(node, tag))))
			return
		}
		for child := node.FirstChild; child != nil; child = child.NextSibling {
			crawler(child)
		}
	}
	crawler(doc)
	if code != nil {
		return code, nil
	}
	return nil, errors.New("Missing tag in the node tree")
}

func renderNode(n *html.Node, tag string) string {
	var buf bytes.Buffer
	w := io.Writer(&buf)
	html.Render(w, n)
	return strings.ReplaceAll(strings.ReplaceAll(buf.String(), fmt.Sprintf("<%v>", tag), ""), fmt.Sprintf("</%v>", tag), "")
}

func extractCode(codes []string, content string, link string) string {
	isSt := link != ""

	// split parts from content
	var parts []string
	if isSt {
		parts = strings.Split(content, "\n\n")
	} else {
		content = strings.ReplaceAll(content, "\n\n", "\n")
		parts = strings.Split(content, "\n")
	}
	for i := range parts {
		parts[i] = strings.ReplaceAll(parts[i], "\n", " ")
	}

	// pList to check duplicate headers for code
	hList := map[string]bool{}
	var res []string

	codes = tfidf.GetMostImportant(codes, isSt)
	if codes == nil {
		return ""
	}

	for j := range codes {
		for i := range parts {
			if strings.Contains(parts[i], strings.Split(codes[j], "\n")[0]) {
				// ignore when code in headers
				isDuplicate := false
				for k := range hList {
					if strings.Contains(k, codes[j]) {
						isDuplicate = true
					}
				}

				index := i - 1
				if i == 0 {
					index = 0
				}

				header, err := html2text.FromString(parts[index])
				if err != nil {
					return ""
				}

				// ignore duplicate headers
				if hList[header] == true {
					continue
				}
				hList[header] = true

				r := fmt.Sprintf("\033[0;36m%v\033[0m", header)
				if !isDuplicate {
					r = fmt.Sprintf("%v\n\n%v", r, codes[j])
				}
				res = append(res, r)
			}
		}
	}

	if isSt {
		return fmt.Sprintf("%v\n\n%v", strings.Join(res, "\n\n"), consts.ParseLink(link))
	}

	return strings.Join(res, "\n\n")
}

func summarizeContent(content string) string {
	content, err := html2text.FromString(content, html2text.Options{PrettyTables: true})
	if err != nil {
		return ""
	}
	ct := extractBody(content)

	var cts []string
	dup := map[string]bool{}

	// heurestic way to extract content from body (based on length and some contents)
	for i := range ct {
		if ct[i] == "" {
			continue
		}
		temp := strings.Split(ct[i], "\n")
		isContent := true
		link := regexp.MustCompile(`\( .* \)`)
		for j := range temp {
			if temp[j] == "" {
				continue
			}

			if len(strings.Split(temp[j], " ")) < 10 || len(temp[j]) < 160 {
				if len(ct[i]) > 100 && !link.MatchString(ct[i]) && !strings.Contains(ct[i], "#") &&
					!strings.Contains(ct[i], ".jpg") && !strings.Contains(ct[i], ".jpeg") &&
					!strings.Contains(ct[i], ".png") && !strings.Contains(ct[i], ".gif") {
					continue
				}
				isContent = false
				break
			}
		}
		if isContent {
			if !dup[ct[i]] {
				cts = append(cts, link.ReplaceAllString(removeAllTag(ct[i]), ""))
				dup[ct[i]] = true
			}
			if i < len(ct)-2 {
				if !dup[ct[i+1]] {
					cts = append(cts, link.ReplaceAllString(removeAllTag(ct[i+1]), ""))
					dup[ct[i+1]] = true
				}
			}

		}
	}

	// clean up duplicate (appears most in footer)
	for i := range cts {
		cts[i] = strings.ReplaceAll(cts[i], "*", "")
		if i != 0 {
			if strings.Contains(cts[i], cts[i-1]) {
				cts = cts[:i-1]
				break
			}
		}
	}

	// summarize
	var res string
	if len(cts) > 20 {
		res = strings.Join(textrank.ExtractSentences(strings.Join(cts, "\n"), 1), "\n\n")
	} else {
		res = strings.Join(cts, "\n\n")
	}

	// format table and final tune
	tableBorder := regexp.MustCompile(`\+(-+\+)+`)
	if tableBorder.MatchString(res) {
		tableParts := tableBorder.Split(res, -1)
		for i := 2; i < len(tableParts); i += 3 {
			parts := strings.Split(tableParts[i], "\n")
			if len(parts) > 3 {
				res = strings.ReplaceAll(res, tableParts[i], strings.Join(parts[:3], "\n")+"\n")
			}
		}
	}
	quote := regexp.MustCompile(`\[ .* \]`)
	res = quote.ReplaceAllString(res, "")
	if len(res) > 2000 {
		return ""
	}

	h := regexp.MustCompile(`(\n[\t ]*)(\n[\t ]*)(\n[\t ]*)+`)
	return h.ReplaceAllString(res, "\n\n")
}

func extractHeaders(content string) []string {
	headers := regexp.MustCompile(`(\*\*+|--+\n)?(.*)(\n(\*\*+|--+))`)
	s := headers.FindAllStringSubmatch(content, -1)
	var res []string
	for i := range s {
		res = append(res, s[i][2])
	}
	return res
}

func extractBody(content string) []string {
	header := regexp.MustCompile(`((\n\n+)|(\n(\*\*+|--+)\n)|((\*\*+|--+)\n))`)
	return header.Split(content, -1)
}

func removeAllTag(content string) string {
	h := regexp.MustCompile(`<.*>`)
	return h.ReplaceAllString(content, "")
}
