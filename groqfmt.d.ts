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
