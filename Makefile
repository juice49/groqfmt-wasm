all: build

build:
	GOOS=js GOARCH=wasm go build -o dist/groqfmt.wasm
