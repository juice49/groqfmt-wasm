/** @public */
export interface GroqfmtError {
  begin: number
  end?: number
  message: string
}

/** @public */
export type GroqfmtResult =
  | {
      error: GroqfmtError
      result: undefined
    }
  | {
      error: undefined
      result: string
    }

/** @public */
export type Groqfmt = (query: string) => GroqfmtResult

/**@public */
export interface Go {
  new (): {
    run: (instance: WebAssembly.Instance) => Promise<void>
    importObject: WebAssembly.Imports
  }
}
