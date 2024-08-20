export function formatUuid(uuid: string): string {
  // Regex to match groups of 8 characters
  const regex = /(.{8})/g
  const formattedUuid = uuid.replace(regex, (_, $1) => `${$1}-`)

  // Remove the trailing hyphen
  return formattedUuid.slice(0, -1)
}
