import { type Groqfmt, type GroqfmtResult } from '../../groqfmt/types'
import getQueryDetails, { type Details } from './get-query-details'
import getQueryParams from './get-query-params'

/** @public */
export type GroqfmtResultEnhanced =
  | ({
      inputMode: 'groq'
    } & GroqfmtResult)
  | ({
      inputMode: 'url'
      params?: Record<string, string>
    } & GroqfmtResult &
      Partial<Details>)

/** @public */
export function format({
  input,
  groqfmt,
}: {
  input: string
  groqfmt: Groqfmt
}): GroqfmtResultEnhanced {
  const { result, error } = groqfmt(input)

  if (error) {
    try {
      const url = new URL(input)
      const query = url.searchParams.get('query')

      if (query) {
        return {
          ...groqfmt(query),
          ...getQueryDetails(url),
          params: getQueryParams(url),
          inputMode: 'url',
        }
      }

      return {
        inputMode: 'url',
        result,
        error,
      }
    } catch {}

    return {
      inputMode: 'groq',
      result,
      error,
    }
  }

  return {
    inputMode: 'groq',
    result,
    error,
  }
}
