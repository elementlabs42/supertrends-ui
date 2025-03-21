import { useMemo, useState } from 'react'
import { PAGINATION_DATA_DEFAULT, PaginationContext } from './context'

export function PaginationProvider({ children }: { children: React.ReactNode }) {
  const [totalInternal, setTotalInternal] = useState(0)
  const setTotal = (total: number) => {
    setTotalInternal(total)
  }

  const [currentInternal, setCurrentInternal] = useState(0)
  const setCurrent = (page: number) => {
    setCurrentInternal(page)
  }
  const value = useMemo(() => {
    return {
      total: totalInternal,
      setTotal,
      perPage: PAGINATION_DATA_DEFAULT.perPage,
      current: currentInternal,
      setCurrent,
    }
  }, [totalInternal, currentInternal])
  return <PaginationContext.Provider value={value}>{children}</PaginationContext.Provider>
}
