import './wasm-exec.js'

type GroqfmtResult =
  | {
      error: string
      result: undefined
    }
  | {
      error: undefined
      result: string
    }

declare const groqfmt: (query: string) => GroqfmtResult

declare const Go: {
  new (): {
    run: (instance: WebAssembly.Instance) => Promise<void>
    importObject: WebAssembly.Imports
  }
}

const go = new Go()
const wasmCode = await Deno.readFile('./dist/groqfmt.wasm')
const wasmModule = new WebAssembly.Module(wasmCode)
const wasmInstance = new WebAssembly.Instance(wasmModule, go.importObject)

go.run(wasmInstance)

console.log(
  groqfmt(
    `*[_type =='hellloDave']    {   _id, name,  'someOtherThing': count(thing)}`,
  ).result,
)
