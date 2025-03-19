import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { Pager } from './Pager'
import { Panel } from '.'
import { usePagination } from '@/providers/pagination'

interface Props {
  children?: ReactNode
  className?: string
  dataSize: number
}

export function PaginationPanel({ children, className, dataSize }: Props) {
  const { total, setTotal, perPage, current, setCurrent } = usePagination()

  useEffect(() => {
    setTotal(dataSize)
  }, [dataSize, setTotal])

  return (
    <Container className={className}>
      {children}
      {total > perPage && (
        <PagerWrapper>
          <Pager
            total={Math.ceil(total / perPage)}
            current={current}
            onPageClick={(pageIndex) => {
              setCurrent(pageIndex)
            }}
          />
        </PagerWrapper>
      )}
    </Container>
  )
}

const Container = styled(Panel)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PagerWrapper = styled.div`
  margin: 1em 3em 0 0;
  display: flex;
  justify-content: right;
`
