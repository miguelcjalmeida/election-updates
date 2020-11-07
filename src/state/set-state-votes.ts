import getState from './get-state'

export default (name: string, vote1: string, vote2: string) => {
  let state = getState(name)
  const votesColumn = state.querySelectorAll(':scope > div')[1]
  const bidenVoteSection = votesColumn.querySelectorAll(':scope > div')[0]
  const trumpVoteSection = votesColumn.querySelectorAll(':scope > div')[1]
  bidenVoteSection.querySelectorAll(':scope > span')[1].textContent = vote1
  trumpVoteSection.querySelectorAll(':scope > span')[1].textContent = vote2
}
