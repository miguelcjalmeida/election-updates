import getSectionVotes from './get-section-votes'

export default (state: Element) => {
  const votesColumn = state.querySelectorAll(':scope > div')[1]
  const bidenVoteSection = votesColumn.querySelectorAll(':scope > div')[0]
  return getSectionVotes(bidenVoteSection)
}
