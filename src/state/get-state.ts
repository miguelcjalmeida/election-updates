export default (name: string) => {
  const stateName = document.evaluate(`//span[text()="${name}"]`, document, null, XPathResult.ANY_TYPE, null).iterateNext()
  const state = stateName?.parentNode?.parentNode
  if (!state) throw new Error(`given state ${name} was not found`)
  return state
}
