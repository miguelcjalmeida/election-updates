import notifyOfUpdates from '../updates/notify-of-updates'
import didAnyVoteHappen from '../state/did-any-vote-happen'
import getStateName from '../state/get-state-name'
import getStateVotes from '../state/get-state-votes'
import getStateUpdates from '../updates/get-state-updates'
import cachedVotesByState from './votes-cached'

export interface IAppUpdater {
  start(): void
}

export class AppUpdater implements IAppUpdater {
  private hasNewVotes: boolean

  private stateElements: NodeListOf<Element>

  start() {
    this.setInitialValues()
    this.keepCheckingForChanges()
  }

  private setInitialValues() {
    this.hasNewVotes = false
    this.refreshListOfStates()
    this.stateElements.forEach(AppUpdater.saveStateInCache)
  }

  private refreshListOfStates() {
    this.stateElements = document.querySelectorAll('.fKE5Bb')
  }

  private static saveStateInCache(state: Element) {
    const stateName = getStateName(state)
    cachedVotesByState[stateName] = [0, 0]
  }

  private keepCheckingForChanges() {
    const repetition = () => {
      try {
        console.log('checking for new votes..')
        this.checkForChanges()
      } catch (ex) {
        console.log('Error checking for changes, trying again soon', ex)
      }
    }

    setTimeout(repetition.bind(this), 1000)
    setInterval(repetition.bind(this), 60000)
  }

  private checkForChanges() {
    this.refreshListOfStates()
    this.stateElements = document.querySelectorAll('.fKE5Bb')
    this.stateElements.forEach(this.checkForStateChanges.bind(this))

    if (this.hasNewVotes) {
      notifyOfUpdates()
      this.hasNewVotes = false
    }
  }

  private checkForStateChanges(state: Element) {
    if (didAnyVoteHappen(state)) {
      console.log(getStateUpdates(state))
      cachedVotesByState[getStateName(state)] = getStateVotes(state)
      this.hasNewVotes = true
    }
  }
}
