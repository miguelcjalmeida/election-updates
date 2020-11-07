import getSectionVotes from './get-section-votes'

export default ($state: Element) => {
  const $votes = $state.querySelectorAll(':scope > div')[1]
  const $trump = $votes.querySelectorAll(':scope > div')[1]
  return getSectionVotes($trump)
}
