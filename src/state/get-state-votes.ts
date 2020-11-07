import { Votes } from '../app/vote'
import getBidenVotes from './get-biden-votes'
import getTrumpVotes from './get-trump-votes'

export default (state: Element): Votes => {
  return [getBidenVotes(state), getTrumpVotes(state)]
}
