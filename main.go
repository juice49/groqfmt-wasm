package main

import (
	"bytes"
	"github.com/sanity-io/go-groq/parser"
	"github.com/sanity-io/go-groq/print"
	"regexp"
	"syscall/js"
)

func main() {
	js.Global().Set("groqfmt", jsFormat())
	<-make(chan bool)
}

func jsFormat() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		formatted, error := format(args[0].String())

		if error != nil {
			return map[string]interface{}{
				"error": parseError(error.Error()),
			}
		}

		return map[string]interface{}{
			"result": formatted,
		}
	})
}

func parseError(error string) map[string]interface{} {
	regex := regexp.MustCompile(`parse error at positions? (?P<begin>[0-9]+)(?:\.\.)?(?P<end>[0-9]+)?: (?P<message>.*)`)
	match := regex.FindStringSubmatch(error)
	subMatchMap := make(map[string]interface{})

	for index, name := range regex.SubexpNames() {
		if index != 0 && match[index] != "" {
			subMatchMap[name] = match[index]
		}
	}

	return subMatchMap
}

func format(query string) (string, error) {
	q, err := parser.Parse(query, parser.WithParamNodes())

	if err != nil {
		return "", err
	}

	var buf bytes.Buffer

	if err := print.PrettyPrint(q, &buf); err != nil {
		return "", err
	}

	if _, err := buf.Write([]byte("\n")); err != nil {
		return "", err
	}

	return buf.String(), nil
}
