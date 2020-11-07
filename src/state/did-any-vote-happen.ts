import cachedVotesByState from '../app/votes-cached'
import areVotesEqual from './are-votes-equal'
import getStateName from './get-state-name'
import getStateVotes from './get-state-votes'

export default ($state: Element) => {
  const stateName = getStateName($state)
  const currentVotes = getStateVotes($state)
  const cacheVotes = cachedVotesByState[stateName]
  return !areVotesEqual(currentVotes, cacheVotes)
}
