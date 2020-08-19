package tfidf

import (
	"crypto/md5"
	"encoding/hex"
	"math"
	"regexp"
	"sort"
	"strings"
)

// GetMostImportant returns the paragraphs in order of importances desc
func GetMostImportant(text []string, isSt bool) []string {
	type weightData struct {
		Data   string
		Weight float64
	}
	f := New()
	var temp []string
	for i := range text {
		temp = append(temp, text[i])
	}
	for i := range temp {
		// whitelist some symbols
		temp[i] = strings.ReplaceAll(temp[i], "[", " ")
		temp[i] = strings.ReplaceAll(temp[i], "]", " ")
		temp[i] = strings.ReplaceAll(temp[i], "(", " ")
		temp[i] = strings.ReplaceAll(temp[i], ")", " ")
		temp[i] = strings.ReplaceAll(temp[i], ";", " ")
		temp[i] = strings.ReplaceAll(temp[i], ".", " ")
		temp[i] = strings.ToLower(temp[i])
	}
	f.AddDocs(temp...)
	var wD []weightData
	for i := range temp {
		if len(strings.Fields(text[i])) < 2 {
			continue
		}
		w := f.Cal(temp[i])
		var weight float64
		for j := range w {
			weight += w[j]
		}
		if isSt && len(wD) != 0 {
			if weight > 1 {
				continue
			}
		}
		weight /= float64(len(w))
		wD = append(wD, weightData{Weight: weight, Data: text[i]})
	}
	sort.Slice(wD[:], func(i, j int) bool {
		return wD[i].Weight < wD[j].Weight
	})
	if len(wD) > 1 {
		if wD[0].Weight == wD[len(wD)-1].Weight {
			return nil
		}
	}

	var res []string
	for i := range wD {
		h := regexp.MustCompile(`(<.*>)(.*)(<\/.*>)`)
		sub := h.FindAllStringSubmatch(wD[i].Data, -1)
		for j := range sub {
			wD[i].Data = strings.ReplaceAll(wD[i].Data, sub[j][0], sub[j][2])
		}
		res = append(res, wD[i].Data)
	}
	if len(res) > 3 {
		res = res[:3]
	}
	return res
}

// TFIDF model
type TFIDF struct {
	docIndex  map[string]int   // train document index in TermFreqs
	termFreqs []map[string]int // term frequency for each train document
	termDocs  map[string]int   // documents number for each term in train data
	n         int              // number of documents in train data
}

// New new model with default
func New() *TFIDF {
	return &TFIDF{
		docIndex:  make(map[string]int),
		termFreqs: make([]map[string]int, 0),
		termDocs:  make(map[string]int),
		n:         0,
	}
}

// AddDocs add train documents
func (f *TFIDF) AddDocs(docs ...string) {
	for _, doc := range docs {
		h := hash(doc)
		if f.docHashPos(h) >= 0 {
			return
		}

		termFreq := f.termFreq(doc)
		if len(termFreq) == 0 {
			return
		}

		f.docIndex[h] = f.n
		f.n++

		f.termFreqs = append(f.termFreqs, termFreq)

		for term := range termFreq {
			f.termDocs[term]++
		}
	}
}

// Cal calculate tf-idf weight for specified document
func (f *TFIDF) Cal(doc string) (weight map[string]float64) {
	weight = make(map[string]float64)

	var termFreq map[string]int

	docPos := f.docPos(doc)
	if docPos < 0 {
		termFreq = f.termFreq(doc)
	} else {
		termFreq = f.termFreqs[docPos]
	}

	docTerms := 0
	for _, freq := range termFreq {
		docTerms += freq
	}
	for term, freq := range termFreq {
		weight[term] = tfidf(freq, docTerms, f.termDocs[term], f.n)
	}

	return weight
}

func (f *TFIDF) termFreq(doc string) (m map[string]int) {
	m = make(map[string]int)

	tokens := strings.Fields(doc)
	if len(tokens) == 0 {
		return
	}

	for _, term := range tokens {
		m[term]++
	}

	return
}

func (f *TFIDF) docHashPos(hash string) int {
	if pos, ok := f.docIndex[hash]; ok {
		return pos
	}

	return -1
}

func (f *TFIDF) docPos(doc string) int {
	return f.docHashPos(hash(doc))
}

func hash(text string) string {
	h := md5.New()
	h.Write([]byte(text))
	return hex.EncodeToString(h.Sum(nil))
}

func tfidf(termFreq, docTerms, termDocs, N int) float64 {
	tf := float64(termFreq) / float64(docTerms)
	idf := math.Log(float64(1+N) / (1 + float64(termDocs)))
	return tf * idf
}
