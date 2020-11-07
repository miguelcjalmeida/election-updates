import getSectionVotes from './get-section-votes'
import getSectionVotesPerc from './get-section-votes-perc'

export default (state: Element) => {
  const votesColumn = state.querySelectorAll(':scope > div')[1]
  const bidenVoteSection = votesColumn.querySelectorAll(':scope > div')[0]
  const trumpVoteSection = votesColumn.querySelectorAll(':scope > div')[1]
  const bidenVotes = getSectionVotes(bidenVoteSection)
  const trumpVotes = getSectionVotes(trumpVoteSection)
  const bidenVotesPerc = getSectionVotesPerc(bidenVoteSection)
  const trumpVotesPerc = getSectionVotesPerc(trumpVoteSection)
  const bothVotesPerc = bidenVotesPerc + trumpVotesPerc
  const bothVotes = bidenVotes + trumpVotes

  return Math.round((bothVotes * 100) / bothVotesPerc)
}
