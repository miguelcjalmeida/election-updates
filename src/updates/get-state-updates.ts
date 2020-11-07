import getStateName from '../state/get-state-name'
import getStateVotes from '../state/get-state-votes'
import cachedVotesByState from '../app/votes-cached'
import getStateReportedVotesPerc from '../state/get-state-reported-votes-perc'
import getAllPartiesVotes from '../state/get-all-parties-votes'
import f from './format'

export default (state: Element) => {
  const biden = 'Biden'
  const trump = 'Trump'
  const stateName = getStateName(state)
  const currentVotes = getStateVotes(state)
  const cachedVotes = cachedVotesByState[stateName]
  const votesDiff = Math.abs(currentVotes[0] - currentVotes[1])
  const isBidenWinning = currentVotes[0] >= currentVotes[1]
  const losingCandidate = isBidenWinning ? trump : biden
  const bidenNewVotes = currentVotes[0] - cachedVotes[0]
  const trumpNewVotes = currentVotes[1] - cachedVotes[1]

  const totalNewVotes = bidenNewVotes + trumpNewVotes
  const trumpPercNewVotes = trumpNewVotes / totalNewVotes
  const bidenPercNewVotes = bidenNewVotes / totalNewVotes
  const loserDiffPercNewVote = isBidenWinning ? trumpPercNewVotes - bidenPercNewVotes : bidenPercNewVotes - trumpPercNewVotes
  const projectionInFloat = votesDiff / loserDiffPercNewVote

  const projection = Math.round(projectionInFloat)
  const isProjectionVisible = (isBidenWinning && trumpNewVotes > bidenNewVotes) || (!isBidenWinning && bidenNewVotes > trumpNewVotes)

  const reportedVotesPerc = getStateReportedVotesPerc(state)
  const unreportedVotesPerc = 100 - reportedVotesPerc
  const allPartiesVotes = getAllPartiesVotes(state)
  const estimatedMissingVotes = Math.round(allPartiesVotes - (allPartiesVotes * reportedVotesPerc) / 100)

  const line1 = `${stateName} got new votes!`
  const line2 = buildVoteLine(biden, cachedVotes[0], currentVotes[0])
  const line3 = buildVoteLine(trump, cachedVotes[1], currentVotes[1])
  const line4 = `${losingCandidate} needs ${f(votesDiff)} votes`
  const line5 = `${stateName} has yet to report up to ${f(estimatedMissingVotes)} (${f(unreportedVotesPerc)}%) votes.`
  const line5Addendum = `So far ${f(allPartiesVotes)} (${f(reportedVotesPerc)}%) votes were counted`
  const line6 = isProjectionVisible ? `By projection, ${losingCandidate} could be winning after ${f(projection)} more votes counted` : ''
  const line7 =
    votesDiff > estimatedMissingVotes
      ? `DONE! Race is over in the state of ${stateName}\nBecause ${losingCandidate} would need more votes than the amount left to count!`
      : ''

  return `${line1}\n${line2}\n${line3}\n${line4}\n${line5} ${line5Addendum}\n${line6}\n${line7}`
}

function buildVoteLine(candidate: string, oldVote: number, currentVote: number) {
  const oldVoteFormatted = f(oldVote)
  const currentVoteFormatted = f(currentVote)
  const diffPrefix = currentVote > oldVote ? '+' : ''
  const diffFormatted = `${diffPrefix}${f(currentVote - oldVote)}`

  return `${candidate}: ${oldVoteFormatted} -> ${currentVoteFormatted} (${diffFormatted})`
}
