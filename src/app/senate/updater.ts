import cachedVotesByCandidates from './votes-cached'

export interface ISenateUpdater {
  start(): void
}

export class SenateUpdater implements ISenateUpdater {


  start() {
    let candidates = this.getCandidateNames()
    this.setInitialValues(candidates)
    this.keepCheckingForChanges()
  }

  getCandidateNames(): string[] {
    let cElements = Array.from(document.querySelectorAll('.xKiWDb.kKVYgd.sqDYab'))
    return cElements.map(e => e.textContent!)
  }

  setInitialValues(candidates: string[]) {
    candidates.forEach(c => {
      cachedVotesByCandidates[c] = 0;
    });
  }

  keepCheckingForChanges() {
    throw new Error("Method not implemented.")
  }


}
