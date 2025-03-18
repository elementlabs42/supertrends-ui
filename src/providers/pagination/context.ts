import { createContext, useContext } from 'react'

type PaginationData = {
  total: number
  setTotal: (total: number) => void
  perPage: number
  current: number
  setCurrent: (page: number) => void
}

export const PAGINATION_DATA_DEFAULT: PaginationData = {
  total: 0,
  setTotal: () => {},
  perPage: 6,
  current: 0,
  setCurrent: () => {},
}

export const PaginationContext = createContext<PaginationData>(PAGINATION_DATA_DEFAULT)

export function usePagination() {
  return useContext(PaginationContext)
}
