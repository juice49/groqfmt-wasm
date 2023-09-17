/** @public */
export interface Details {
  projectId: string
  dataset: string
  cdn: boolean
  apiVersion: string
  perspective?: string
}

export default function getQueryDetails(url: URL): Details {
  return {
    projectId: getProjectId(url),
    dataset: getDataset(url),
    cdn: getCdn(url),
    apiVersion: getApiVersion(url),
    perspective: getPerspective(url),
  }
}

export function getProjectId(url: URL): string {
  return getHostnameSegment(url, 0)
}

export function getDataset(url: URL): string {
  return getPathnameSegment(url, 3)
}

export function getCdn(url: URL): boolean {
  return getHostnameSegment(url, 1) === 'apicdn'
}

export function getApiVersion(url: URL): string {
  return getPathnameSegment(url, 0)
}

export function getPerspective(url: URL): string | undefined {
  return url.searchParams.get('perspective') ?? undefined
}

export function getPathnameSegment(url: URL, segmentIndex: number): string {
  const separator = '/'
  return url.pathname.split(separator)[segmentIndex + 1]
}

export function getHostnameSegment(url: URL, segmentIndex: number): string {
  const separator = '.'
  return url.hostname.split(separator)[segmentIndex]
}
