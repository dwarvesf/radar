package similar

import (
	stemmer "github.com/agonopol/go-stem"
	"github.com/sahilm/fuzzy"
)

// GetMostSimilar return the most similar match with str from list
func GetMostSimilar(str string, list []string) string {
	str = string(stemmer.Stem([]byte(str)))
	matches := fuzzy.Find(str, list)
	if matches.Len() == 0 {
		return ""
	}
	return matches[0].Str
}
