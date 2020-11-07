import { Votes } from '../app/vote'

export default (votes1: Votes, votes2: Votes) => {
  return votes1[0] == votes2[0] && votes1[1] === votes2[1]
}
