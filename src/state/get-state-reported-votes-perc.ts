export default (state: Element) => {
  const percentage = state.querySelector('.E2WDKf')?.textContent
  if (!percentage) throw new Error(`Could not retrieve given state percentage '${state}'`)

  const match = percentage.match(/(\d+)%/)
  if (!match) throw new Error(`Unable to recognize the percentage value for given state '${state}'`)

  return parseInt(match[1])
}
