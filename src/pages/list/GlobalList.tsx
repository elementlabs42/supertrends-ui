import { TokenTable } from '@/components/controls'
import { Page } from '@/components/layout'
import { Token } from '@/models'
import styled from 'styled-components'
import { useToken } from '@/providers/token/provider'
import { useEffect } from 'react'

export default function GloablList() {
  const { setTokens } = useToken()
  const tokenList = createDummyTokens()

  useEffect(() => {
    setTokens(tokenList)
  }, [setTokens])

  return (
    <Page>
      <main>
        <Title>Global List</Title>
        <TokenTable data={tokenList} />
      </main>
    </Page>
  )
}

const Title = styled.h1`
  margin: 0;
  padding: 0 1vw;
`

function createDummyTokens(): Token[] {
  const token0 = new Token(
    '$NextBiologicalTarget',
    '$NEXT',
    18,
    '0x0B175474E89094C44Da98b954EedeAC495271d0F',
    'Molecules within organisms that interact with drugs',
  )
  const token1 = new Token(
    '$KRASMutations',
    '$KRAS',
    18,
    '0x1B175474E89094C44Da98b954EedeAC495271d0F',
    'Cancer treatment',
    token0,
  )
  token1.setDescription('Leading to uncontrolled cell growth')
  const token2 = new Token(
    '$TauProteins',
    '$TAUP',
    18,
    '0x2B175474E89094C44Da98b954EedeAC495271d0F',
    'Alzheimer treatment',
    token0,
  )
  token2.setDescription('Microtubule-associated proteins')
  const token3 = new Token(
    '$PredictionMarkets',
    '$PRED',
    18,
    '0x3B175474E89094C44Da98b954EedeAC495271d0F',
    'Trading on the possible outcomes of events',
  )
  const token4 = new Token('$SuperTrend', '$SUPT', 18, '0x4B175474E89094C44Da98b954EedeAC495271d0F', 'Exchange', token3)
  token4.setDescription('Turn any ideas into a coin')
  const token5 = new Token(
    '$AGI',
    '$AGI',
    18,
    '0x5B175474E89094C44Da98b954EedeAC495271d0F',
    'Human-like AI capable of reasoning, learning, and adapting across tasks',
  )
  const token6 = new Token(
    '$Manus',
    '$MANU',
    18,
    '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    'Automation and workflow',
    token5,
  )
  token6.setDescription('General AI agent that bridges minds and actions')

  return [token0, token1, token2, token3, token4, token5, token6]
}
