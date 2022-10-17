/// <reference types="./groqfmt.d.ts" />
import './wasm-exec.js'

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
