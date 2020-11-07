import getSectionVotes from './get-section-votes'

export default ($state: Element) => {
  const $votes = $state.querySelectorAll(':scope > div')[1]
  const $biden = $votes.querySelectorAll(':scope > div')[0]
  return getSectionVotes($biden)
}
