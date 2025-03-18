import styled from 'styled-components'
import { Loading } from '../common'
import { usePagination } from '@/providers/pagination'
import { Token } from '@/models'

interface Props {
  data?: Token[]
  className?: string
}

export function TokenTable({ data, className }: Props) {
  const { perPage, current } = usePagination()
  return data ? (
    <Container className={className}>
      <Table>
        <thead>
          <TableRow>
            <th>Token</th>
            <th>About</th>
            <th>Price</th>
            <th>24H</th>
            <th>Market Cap</th>
            <th></th>
          </TableRow>
        </thead>
        <tbody>
          {data.slice(current * perPage, (current + 1) * perPage).map((token) => {
            const dynamics = token.getCurrentDynamics()
            return (
              <TableRow key={token.getAddress()}>
                <td>{token.getName()}</td>
                <td>
                  {token.getTitle()}
                  {token.getDescription() && (
                    <span>
                      <br /> {token.getDescription()}
                    </span>
                  )}
                </td>
                <td>{dynamics ? String(dynamics.price) : 'N/A'}</td>
                <td>N/A</td>
                <td>{dynamics ? String(dynamics.cap) : 'N/A'}</td>
                <td>Buy Sell</td>
              </TableRow>
            )
          })}
        </tbody>
      </Table>
    </Container>
  ) : (
    <Loading />
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5em;
  transition: row-gap 0.2s ease-out;
`

const Table = styled.table`
  border: 1px solid;
`

const TableRow = styled.tr`
  text-align: left;
`
