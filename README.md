# groqfmt-wasm

groqfmt-wasm is a formatter for [the GROQ query language](https://github.com/sanity-io/GROQ), designed to be compiled to WebAssembly. This tool is largely based on the existing [groqfmt](https://github.com/sanity-io/groqfmt) tool, and built on top of other tools from the GROQ ecosystem.

Currently the formatter is exposed to JS as the global function `groqfmt`, because I can't get TinyGo's exports working. I'd like to fix that.
