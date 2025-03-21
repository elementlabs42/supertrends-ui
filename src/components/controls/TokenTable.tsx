import styled, { css } from 'styled-components'
import { Loading, PaginationPanel } from '../common'
import { PaginationProvider, usePagination } from '@/providers/pagination'
import { Token } from '@/models'
import { Borders } from '@/constants/themes'
import { useNavigate } from 'react-router-dom'

interface Props {
  data?: Token[]
  className?: string
}

export function TokenTable({ data, className }: Props) {
  return (
    <PaginationProvider>
      <TokenTableInternal data={data} className={className} />
    </PaginationProvider>
  )
}

function TokenTableInternal({ data, className }: Props) {
  const { perPage, current } = usePagination()
  const navigate = useNavigate()

  return data ? (
    <PaginationPanel dataSize={data.length}>
      <Container className={className}>
        <Table>
          <thead>
            <TableRow>
              <HeaderCell>Token</HeaderCell>
              <HeaderCell>About</HeaderCell>
              <HeaderCell>Price</HeaderCell>
              <HeaderCell>24H</HeaderCell>
              <HeaderCell>Market Cap</HeaderCell>
              <HeaderCell></HeaderCell>
            </TableRow>
          </thead>
          <tbody>
            {data.slice(current * perPage, (current + 1) * perPage).map((token) => {
              const dynamics = token.getCurrentDynamics()
              const isSuperToken = !token.getSuperToken()
              return (
                <TableRow
                  key={token.getAddress()}
                  $isSuper={isSuperToken}
                  onClick={() => isSuperToken && navigate(`/subtrend/${token.getAddress()}`)}
                  $clickable={isSuperToken}
                >
                  <DataCell>{token.getName()}</DataCell>
                  <DataCell>
                    {token.getTitle()}
                    {token.getDescription() && (
                      <span>
                        <br /> {token.getDescription()}
                      </span>
                    )}
                  </DataCell>
                  <DataCell>{dynamics ? String(dynamics.price) : 'N/A'}</DataCell>
                  <DataCell>N/A</DataCell>
                  <DataCell>{dynamics ? String(dynamics.cap) : 'N/A'}</DataCell>
                  <DataCell>Buy Sell</DataCell>
                </TableRow>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </PaginationPanel>
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
  font-size: 1em;
  border-radius: ${Borders.PanelRadius};
  border-collapse: collapse;
  border-style: hidden;
  overflow: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.TableBorder};
`

const TableRow = styled.tr.attrs<{ $isSuper?: boolean; $clickable?: boolean }>((props) => ({
  $isSuper: props.$isSuper,
  $clickable: props.$clickable,
}))`
  ${(props) => (props.$isSuper ? `background-color: ${props.theme.TableHeaderBackground};` : '')}
  text-align: left;
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
  transition: background-color 0.2s ease-out;

  &:hover {
    background-color: ${({ theme, $clickable }) => ($clickable ? theme.HoverArea : 'inherit')};
  }
`

const TableCellStyle = css`
  border-top: 1px solid ${({ theme }) => theme.TableBorder};
  border-bottom: 1px solid ${({ theme }) => theme.TableBorder};
  padding: 1em;
`

const DataCell = styled.td`
  ${TableCellStyle}
`

const HeaderCell = styled.th`
  background-color: ${({ theme }) => theme.TableHeaderBackground};
  ${TableCellStyle}
`
