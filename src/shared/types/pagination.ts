export type PaginationData = {
  totalCount: number | null
  nextPage: number | null
  limit: number
}

export type PaginationQueryParams = {
  limit: number
  page: number
}
