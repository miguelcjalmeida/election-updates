export default (state: Element) => {
  return state.querySelector(':scope > div > span')?.textContent ?? ''
}
