package answer

import (
	"fmt"
	"strings"

	"github.com/mkhoi1998/mimir/cmd/handler"
	"github.com/mkhoi1998/mimir/consts"
)

// Handler response input question based on keywords and online resources (Stackoverflow and Google)
func Handler(args []string) {
	fmt.Println(responseAnswer(args))
}

func responseAnswer(args []string) string {
	keywords := handler.ExtractKeywords(strings.Join(args, " "))

	var res string
	switch len(keywords) {
	case 0:
		return consts.Greet()
	case 1:
		res = handler.SummarizeStackWiki(keywords[0])
	case 2:
		res = handler.ExtractStackWiki(keywords)
	default:
		res = handler.SummarizeStackoverflow(keywords)
	}

	if res == "" {
		res = handler.SummarizeGoogle(args)
	}
	if res == "" {
		res = consts.Error()
	}
	return res
}
