import getSectionVotes from './get-section-votes'

export default (state: Element) => {
  const votesColumn = state.querySelectorAll(':scope > div')[1]
  const trumpVoteSection = votesColumn.querySelectorAll(':scope > div')[1]
  return getSectionVotes(trumpVoteSection)
}
