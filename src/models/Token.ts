export type TokenDynamics = {
  price: bigint
  cap: bigint
}

export class Token {
  private name: string
  private symbol: string
  private decimals: number
  private address: string
  private title: string
  private superToken?: Token
  private description?: string
  // ordered from most recent to oldest
  // consider use SortedMap (btree) in @/utils or https://www.npmjs.com/package/@collectable/sorted-map (rbtree)
  private historical?: Map<number, TokenDynamics>

  constructor(name: string, symbol: string, decimals: number, address: string, title: string, superToken?: Token) {
    this.name = name
    this.symbol = symbol
    this.decimals = decimals
    this.address = address
    this.title = title
    this.superToken = superToken
  }

  public getName(): string {
    return this.name
  }

  public getSymbol(): string {
    return this.symbol
  }

  public getDecimals(): number {
    return this.decimals
  }

  public getAddress(): string {
    return this.address
  }

  public getTitle(): string {
    return this.title
  }

  public getSuperToken(): Token | undefined {
    return this.superToken
  }

  public setDescription(description: string): void {
    this.description = description
  }

  public getDescription(): string | undefined {
    return this.description
  }

  // needs to be a map of timestamp to TokenDynamics in reversed order, more recent -> older
  public setHistorical(historical: Map<number, TokenDynamics>): void {
    this.historical = historical
  }

  public getCurrentDynamics(): TokenDynamics | undefined {
    if (!this.historical) {
      return undefined
    }
    return this.historical.values().next().value
  }
}
