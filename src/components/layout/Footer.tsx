import styled from 'styled-components'
import { Navigation } from './footers/Navigation'

export function Footer() {
  return (
    <>
      <Spliter />
      <Container>
        <Copy>© 2025 Element Labs. All rights reserved</Copy>
        <Navigation />
      </Container>
    </>
  )
}

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  height: 10vh;
  width: 100%;
  justify-content: space-between;
  font-size: 12px;
  background-color: ${({ theme }) => theme.Background};
`

const Spliter = styled.hr`
  margin: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.FooterText};
  border-top: 1px solid ${({ theme }) => theme.FooterText};
`

const Copy = styled.span`
  color: ${({ theme }) => theme.FooterText};
`
