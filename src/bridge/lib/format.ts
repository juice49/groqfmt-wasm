import { type Groqfmt, type GroqfmtResult } from '../../groqfmt/types'
import getQueryDetails, { type Details } from './get-query-details'
import getQueryParams from './get-query-params'

/** @public */
export type GroqfmtResultEnhanced = GroqfmtResult & {
  params?: Record<string, string>
} & Partial<Details>

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
        }
      }

      return {
        result,
        error,
      }
    } catch {}

    return {
      result,
      error,
    }
  }

  return {
    result,
    error,
  }
}
