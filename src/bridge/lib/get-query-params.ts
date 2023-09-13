export default function getQueryParams(url: URL): Record<string, string> {
  return [...url.searchParams.entries()].reduce((params, [key, value]) => {
    if (!key.startsWith('$')) {
      return params
    }

    return {
      ...params,
      [key.slice(1)]: value.replaceAll('"', ''),
    }
  }, {})
}
