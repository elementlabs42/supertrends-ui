import styled from 'styled-components'
import { LinkedLogo } from './LinkedLogo'

export function Navigation() {
  return (
    <Container>
      <LinkedLogo href="/" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`
