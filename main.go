package main

import (
	"bytes"
	"fmt"
	"github.com/sanity-io/go-groq/parser"
	"github.com/sanity-io/go-groq/print"
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
				"error": error.Error(),
			}
		}

		return map[string]interface{}{
			"result": formatted,
		}
	})
}

func format(query string) (string, error) {
	q, err := parser.Parse(query, parser.WithParamNodes())

	if err != nil {
		return "", fmt.Errorf("parsing query: %w", err)
	}

	var buf bytes.Buffer

	if err := print.PrettyPrint(q, &buf); err != nil {
		return "", fmt.Errorf("formatting query: %w", err)
	}

	if _, err := buf.Write([]byte("\n")); err != nil {
		return "", err
	}

	return buf.String(), nil
}
