declare const groqfmt: import('../../groqfmt/types').Groqfmt
declare const Go: import('../../groqfmt/types').Go

import { describe, expect, it } from 'bun:test'
import '../../groqfmt/wasm-exec'
import { format } from './format'

const go = new Go()
const wasmCode = await Bun.file('./dist/groqfmt.wasm').arrayBuffer()
const wasmModule = new WebAssembly.Module(wasmCode)
const wasmInstance = new WebAssembly.Instance(wasmModule, go.importObject)

go.run(wasmInstance)

describe('format URL', () => {
  // TODO
  it('extracts query from the URL', () => {})

  it('extracts details from the URL', () => {
    expect(
      format({
        input:
          'https://x.apicdn.sanity.io/vX/data/query/y?query=*&perspective=previewDrafts',
        groqfmt,
      }),
    ).toMatchObject({
      projectId: 'x',
      apiVersion: 'vX',
      cdn: true,
      dataset: 'y',
      perspective: 'previewDrafts',
    })

    expect(
      format({
        input: 'https://x.api.sanity.io/vX/data/query/y?query=*',
        groqfmt,
      }),
    ).toMatchObject({
      projectId: 'x',
      apiVersion: 'vX',
      cdn: false,
      dataset: 'y',
      perspective: undefined,
    })
  })

  // TODO
  it('extracts parameters from the URL', () => {})
})

// TODO
describe('format query', () => {})
