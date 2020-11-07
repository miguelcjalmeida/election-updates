import getSectionVotes from './get-section-votes'
import getSectionVotesPerc from './get-section-votes-perc'

export default ($state: Element) => {
  const $votes = $state.querySelectorAll(':scope > div')[1]
  const $biden = $votes.querySelectorAll(':scope > div')[0]
  const $trump = $votes.querySelectorAll(':scope > div')[1]
  const bidenVotes = getSectionVotes($biden)
  const trumpVotes = getSectionVotes($trump)
  const bidenVotesPerc = getSectionVotesPerc($biden)
  const trumpVotesPerc = getSectionVotesPerc($trump)
  const bothVotesPerc = bidenVotesPerc + trumpVotesPerc
  const bothVotes = bidenVotes + trumpVotes

  return Math.round((bothVotes * 100) / bothVotesPerc)
}
