import { Page } from '@/components/layout'
import styled from 'styled-components'

export default function GloablList() {
  return (
    <Page>
      <main>
        <Title>Global List</Title>
      </main>
    </Page>
  )
}

const Title = styled.h1`
  margin: 0;
  padding: 0 1vw;
`
