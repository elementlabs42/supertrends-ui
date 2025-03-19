import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Page } from '@/components/layout'
import { TokenTable } from '@/components/controls'
import { Token } from '@/models'
import { Borders } from '@/constants/themes'
import { useToken } from '@/providers/token/provider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ChartContainer = styled.div`
    .price-chart {
        .recharts-cartesian-grid-horizontal line,
        .recharts-cartesian-grid-vertical line {
            stroke: ${({ theme }) => theme.TableBorder};
        }
        .recharts-text {
            fill: ${({ theme }) => theme.SecondaryText};
        }
        .recharts-line {
            stroke: ${({ theme }) => theme.ButtonBackground};
        }
        .recharts-tooltip-wrapper {
            background-color: ${({ theme }) => theme.Background};
            border: 1px solid ${({ theme }) => theme.TableBorder};
            border-radius: ${Borders.PanelRadius};
            color: ${({ theme }) => theme.Text};
        }
    }
`

export function SubTrend() {
    const { tokenAddress } = useParams<{ tokenAddress: string }>()
    const { tokens } = useToken()

    // Find the clicked token
    const clickedToken = tokens.find(token => token.getAddress() === tokenAddress)
    const tokenName = clickedToken?.getName() || 'Unknown Token'

    // TODO: Replace with actual data fetching logic
    const mockData: Token[] = [
        new Token(
            '$SuperTrend',
            '$ST1',
            18,
            '0x7B175474E89094C44Da98b954EedeAC495271d0F',
            'First subtoken',
            clickedToken || new Token('$ParentToken', '$PT', 18, tokenAddress || '', 'Parent token')
        ),
        new Token(
            '$PolyMarket',
            '$ST2',
            18,
            '0x8B175474E89094C44Da98b954EedeAC495271d0F',
            'Second subtoken',
            clickedToken || new Token('$ParentToken', '$PT', 18, tokenAddress || '', 'Parent token')
        ),
    ]

    // Mock data for price curve with more detailed data points
    const priceData = [
        { time: '2024-01-01', price: 100, volume: 1500000 },
        { time: '2024-01-15', price: 105, volume: 1800000 },
        { time: '2024-02-01', price: 120, volume: 2200000 },
        { time: '2024-02-15', price: 115, volume: 1900000 },
        { time: '2024-03-01', price: 125, volume: 2500000 },
        { time: '2024-03-15', price: 130, volume: 2800000 },
        { time: '2024-04-01', price: 128, volume: 2400000 },
        { time: '2024-04-15', price: 135, volume: 3000000 },
        { time: '2024-05-01', price: 140, volume: 3200000 },
        { time: '2024-05-15', price: 145, volume: 3500000 },
    ]

    // Mock description points
    const descriptionPoints = [
        'Decentralized prediction market platform',
        'Enables trading on various outcomes',
        'Built on blockchain technology',
        'Community-driven governance',
        'Secure and transparent operations'
    ]

    return (
        <Page>
            <Container>
                <Section>
                    <Title>{tokenName} Price History</Title>
                    <PriceGraph>
                        <ChartContainer>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    className="price-chart"
                                    data={priceData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="time"
                                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                                    />
                                    <YAxis
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                        formatter={(value) => [`$${value}`, 'Price']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </PriceGraph>
                </Section>

                <Section>
                    <Title>Why {tokenName} is breaking out</Title>
                    <DescriptionList>
                        {descriptionPoints.map((point, index) => (
                            <DescriptionPoint key={index}>
                                <BulletPoint>•</BulletPoint>
                                {point}
                            </DescriptionPoint>
                        ))}
                    </DescriptionList>
                    <ActionButtons>
                        <Button $primary>Buy</Button>
                        <Button>Sell</Button>
                    </ActionButtons>
                </Section>

                <Section>
                    <Title>{tokenName} SubTrends</Title>
                    <TokenTable data={mockData} />
                </Section>
            </Container>
        </Page>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em;
`

const Section = styled.div`
  margin: 3vh 0;
  background-color: ${({ theme }) => theme.Background};
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`

const Title = styled.h1`
    font-size: 1.5em;
    color: ${({ theme }) => theme.Text};
    margin: 0;
`

const PriceGraph = styled.div`
    height: 300px;
    width: 100%;
    background-color: ${({ theme }) => theme.Background};
    border-radius: ${Borders.PanelRadius};
    display: flex;
    align-items: center;
    justify-content: center;
`

const DescriptionList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    padding: 1.5em;
    background-color: ${({ theme }) => theme.TableHeaderBackground};
    border: 1px solid ${({ theme }) => theme.TableBorder};
    border-radius: ${Borders.PanelRadius};
`

const DescriptionPoint = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5em;
    color: ${({ theme }) => theme.SecondaryText};
`

const BulletPoint = styled.span`
    color: ${({ theme }) => theme.SecondaryText};
`

const ActionButtons = styled.div`
    display: flex;
    gap: 1em;
    margin-top: 1em;
    justify-content: center;
`

const Button = styled.button<{ $primary?: boolean }>`
    padding: 0.8em 1.5em;
    border-radius: ${Borders.ButtonRadius};
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease-out;

    ${({ $primary, theme }) =>
        $primary
            ? `
        background-color: transparent;
        color: ${theme.Text};
        border: 1px solid ${theme.ButtonBackground};
        &:hover {
            background-color: ${theme.HoverArea};
        }
    `
            : `
        background-color: ${theme.ButtonBackground};
        color: ${theme.ButtonText};
        &:hover {
            opacity: 0.9;
        }
    `}
`
