import { Vote } from '../app/vote'
import getBidenVotes from './get-biden-votes'
import getTrumpVotes from './get-trump-votes'

export default ($state: Element): Vote => {
  return [getBidenVotes($state), getTrumpVotes($state)]
}
