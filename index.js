;(function () {
    const votesByStateCache = {}
  
    init()
  
    function init() {
      let $states = document.querySelectorAll('.fKE5Bb')
      let hasNewVotes = false
  
      $states.forEach(($state) => initState($state))
      keepCheckingChanges()
  
      function initState($state) {
        const stateName = getStateName($state)
        votesByStateCache[stateName] = [0, 0]
      }
  
      function checkStateVoteChanges($state) {
        if (didAnyVoteHappenForState($state)) {
          console.log(getStateVoteUpdateMessage($state))
          votesByStateCache[getStateName($state)] = getStateVotes($state)
          hasNewVotes = true
        }
      }
  
      function checkChanges() {
        $states = document.querySelectorAll('.fKE5Bb')
        $states.forEach(($state) => checkStateVoteChanges($state))
        if (hasNewVotes) {
          alert('New votes! Check console.log')
          hasNewVotes = false
        }
      }
  
      function keepCheckingChanges() {
        const repetition = () => {
          console.log('checking for new votes..')
          checkChanges()
        }
  
        repetition()
        setInterval(repetition, 60000)
      }
    }
  
    function getStateVoteUpdateMessage($state) {
      const stateName = getStateName($state)
      const currentVotes = getStateVotes($state)
      const cachedVotes = votesByStateCache[stateName]
      const votesDiff = currentVotes[0] - currentVotes[1]
  
      const line1 = `${stateName} got new votes!`
      const line2 = buildVoteLine('Biden', cachedVotes[0], currentVotes[0])
      const line3 = buildVoteLine('Trump', cachedVotes[1], currentVotes[1])
      const line4 =
        votesDiff >= 0 ? `Trump needs ${f(votesDiff)} votes` : `Biden needs ${f(-votesDiff)} votes`
  
      return `${line1}\n${line2}\n${line3}\n${line4}`
  
      function buildVoteLine(candidate, oldVote, currentVote) {
        const oldVoteFormatted = f(oldVote)
        const currentVoteFormatted = f(currentVote)
        const diffPrefix = currentVote > oldVote ? '+' : ''
        const diffFormatted = `${diffPrefix}${f(currentVote - oldVote)}`
  
        return `${candidate}: ${oldVoteFormatted} -> ${currentVoteFormatted} (${diffFormatted})`
      }
    }
  
    function f(number) {
      return number.toLocaleString()
    }
  
    function didAnyVoteHappenForState($state) {
      const stateName = getStateName($state)
      const currentVotes = getStateVotes($state)
      const cacheVotes = votesByStateCache[stateName]
      return !areVotesEqual(currentVotes, cacheVotes)
    }
  
    function areVotesEqual($votes1, $votes2) {
      return $votes1[0] == $votes2[0] && $votes1[1] === $votes2[1]
    }
  
    function getStateName($state) {
      return $state.querySelector(':scope > div > span').textContent
    }
  
    function getStateVotes($state) {
      return [getBidenVotes($state), getTrumpVotes($state)]
    }
  
    function getBidenVotes($state) {
      const $votes = $state.querySelectorAll(':scope > div')[1]
      const $biden = $votes.querySelectorAll(':scope > div')[0]
      return getSectionVotes($biden)
    }
  
    function getTrumpVotes($state) {
      const $votes = $state.querySelectorAll(':scope > div')[1]
      const $trump = $votes.querySelectorAll(':scope > div')[1]
      return getSectionVotes($trump)
    }
  
    function getSectionVotes($voteSection) {
      return parseInt(
        $voteSection.querySelectorAll(':scope > span')[1].textContent.replace(/[\.\,]/g, ''),
        10,
      )
    }
  
    function getState($name) {
      return document
        .evaluate(`//span[text()="${$name}"]`, document, null, XPathResult.ANY_TYPE, null)
        .iterateNext().parentNode.parentNode
    }
  })()
  