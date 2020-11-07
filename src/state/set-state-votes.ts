import getState from './get-state'

export default (name: string, vote1: string, vote2: string) => {
  let $state = getState(name)
  const $votes = $state.querySelectorAll(':scope > div')[1]
  const $biden = $votes.querySelectorAll(':scope > div')[0]
  const $trump = $votes.querySelectorAll(':scope > div')[1]
  $biden.querySelectorAll(':scope > span')[1].textContent = vote1
  $trump.querySelectorAll(':scope > span')[1].textContent = vote2
}
