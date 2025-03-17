export function formatAddress(address: string, startLength = 6, endLength = 4) {
  if (address.length <= startLength + endLength) {
    return address // Return the full address if it's shorter than the total of start and end lengths
  }
  const start = address.slice(0, startLength)
  const end = address.slice(-endLength)
  return `${start}...${end}`
}
