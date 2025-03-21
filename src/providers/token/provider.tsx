import { createContext, useContext, useState, ReactNode } from 'react'
import { Token } from '@/models'

interface TokenContextType {
  tokens: Token[]
  setTokens: (tokens: Token[]) => void
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<Token[]>([])

  return <TokenContext.Provider value={{ tokens, setTokens }}>{children}</TokenContext.Provider>
}

export function useToken() {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider')
  }
  return context
}
