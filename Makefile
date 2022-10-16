all: build optimise

build:
	tinygo build -o dist/groqfmt.wasm -target wasm main.go

optimise:
	wasm-opt -O dist/groqfmt.wasm -o dist/groqfmt-opt.wasm
