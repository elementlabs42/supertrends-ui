import styled from 'styled-components'
import { useConnectModal as useEthereumConnectModal } from '@rainbow-me/rainbowkit'
import { useQueryClient } from '@tanstack/react-query'

import { Navigation, WalletButton } from './headers'
import { formatAddress } from '@/utils'
import { useClipboard } from '@/hooks/useClipboard'
import { useEBtcBalanceOf, useEthAccount } from '@/hooks/ethereum'

export function Header() {
  const { openConnectModal } = useEthereumConnectModal()
  const [ethereumAccount, isUnsupported] = useEthAccount()
  const queryClient = useQueryClient()
  const [eBtcBalance, balanceOfQueryKey] = useEBtcBalanceOf(ethereumAccount)

  const [copyAddress, contextHolder] = useClipboard('Address copied to clipboard')

  const ethereumWalletText = (() => {
    if (ethereumAccount.address) {
      if (isUnsupported) {
        return 'Unsupported Network'
      }
      return `${formatAddress(ethereumAccount.address)} | ${eBtcBalance} eBTC`
    } else {
      return 'Connect Wallet'
    }
  })()
  const ethereumWalletOnClick = async () => {
    if (ethereumAccount.address) {
      copyAddress(ethereumAccount.address)
      await queryClient.invalidateQueries({ queryKey: balanceOfQueryKey })
    } else {
      openConnectModal?.()
    }
  }

  return (
    <Container>
      <Navigation />
      {contextHolder}
      <WalletContainer>
        <Wallet
          unsupported={ethereumAccount.isConnected && isUnsupported}
          text={ethereumWalletText}
          tooltip={ethereumAccount.chain?.name}
          onClick={ethereumWalletOnClick}
        />
      </WalletContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 15vh;
  width: 100%;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.Background};
`

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-right: 2vw;
`

const Wallet = styled(WalletButton)`
  margin-left: 20px;
`
