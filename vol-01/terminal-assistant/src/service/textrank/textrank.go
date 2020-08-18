package textrank

import (
	"regexp"
	"strings"

	textrank "github.com/DavidBelicza/TextRank"
)

// ExtractKeywords return the keywords from text
func ExtractKeywords(text string) []string {
	tr := newTextRank(text)

	w := textrank.FindSingleWords(tr)

	var res []string
	for i := range w {
		res = append(res, w[i].Word)
	}

	return res
}

// ExtractSentences return the most important sentences of text
func ExtractSentences(text string, count int) []string {
	r := regexp.MustCompile(`[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+|(\.\.+)|(\x60.*\x60)|(".*")|('.*')`)
	rep := r.FindAllString(text, -1)
	for i := range rep {
		// whitelist some symbols
		temp := strings.ReplaceAll(rep[i], "...", "~~~~~~~~~")
		temp = strings.ReplaceAll(temp, "..", "~~~~~~~")
		temp = strings.ReplaceAll(temp, "?", "~~~~~")
		temp = strings.ReplaceAll(temp, "!", "~~~")
		temp = strings.ReplaceAll(temp, ".", "~")
		text = strings.ReplaceAll(text, rep[i], temp)
	}

	tr := newTextRank(text)

	s := textrank.FindSentencesByWordQtyWeight(tr, count)
	var res []string
	for i := range s {
		temp := strings.ReplaceAll(s[i].Value, "~~~~~~~~~", "...")
		temp = strings.ReplaceAll(temp, "~~~~~~~", "..")
		temp = strings.ReplaceAll(temp, "~~~~~", "?")
		temp = strings.ReplaceAll(temp, "~~~", "!")
		temp = strings.ReplaceAll(temp, "~", ".")
		res = append(res, temp)
	}

	return res
}

func newTextRank(text string) *textrank.TextRank {
	tr := textrank.NewTextRank()
	rule := textrank.NewDefaultRule()
	language := textrank.NewDefaultLanguage()
	algorithmDef := textrank.NewDefaultAlgorithm()

	tr.Populate(text, language, rule)
	tr.Ranking(algorithmDef)

	return tr
}
