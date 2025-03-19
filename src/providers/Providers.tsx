import { ReactNode } from 'react'
import { SettingsProvider } from './settings/provider'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { getWagmiChainsConfig } from '@/constants/config'
import { BrowserRouter } from 'react-router-dom'
interface Props {
  children: ReactNode
}

const config = getDefaultConfig({
  appName: 'Supertrends',
  projectId: 'e355babd1f0eb181905a298f13d990fd',
  chains: getWagmiChainsConfig(),
  ssr: false,
})
const queryClient = new QueryClient()

export function Providers(props: Props) {
  return (
    <SettingsProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{props.children}</BrowserRouter>
        </QueryClientProvider>
      </WagmiProvider>
    </SettingsProvider>
  )
}
