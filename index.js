// for testing
var SetStateVotes = null

;(function () {
  const votesByStateCache = {}

  init()
  SetStateVotes = setStateVotes

  function init() {
    let $states = document.querySelectorAll('.fKE5Bb')
    let hasNewVotes = false

    $states.forEach($state => initState($state))
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
      $states.forEach($state => checkStateVoteChanges($state))
      if (hasNewVotes) {
        playNotificationSound()
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

  function playNotificationSound() {
    const sound = new Audio('https://freesound.org/data/previews/320/320654_5260872-lq.ogg')
    sound.play()
  }

  function getStateVoteUpdateMessage($state) {
    const biden = 'Biden'
    const trump = 'Trump'
    const stateName = getStateName($state)
    const currentVotes = getStateVotes($state)
    const cachedVotes = votesByStateCache[stateName]
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

    const projection = parseInt(projectionInFloat, 10)
    const isProjectionVisible = (isBidenWinning && trumpNewVotes > bidenNewVotes) || (!isBidenWinning && bidenNewVotes > trumpNewVotes)

    const reportedVotesPerc = getStateReportedVotesPercentage($state)
    const unreportedVotesPerc = 100 - reportedVotesPerc
    const allPartiesVotes = getAllPartiesVotesOfState($state)
    const estimatedMissingVotes = Math.round(allPartiesVotes - (allPartiesVotes * reportedVotesPerc) / 100)

    const line1 = `${stateName} got new votes!`
    const line2 = buildVoteLine(biden, cachedVotes[0], currentVotes[0])
    const line3 = buildVoteLine(trump, cachedVotes[1], currentVotes[1])
    const line4 = `${losingCandidate} needs ${f(votesDiff)} votes`
    const line5 = `${stateName} has yet to report up to ${f(estimatedMissingVotes)} (${f(unreportedVotesPerc)}%) votes.`
    const line5Addendum = `So far ${f(allPartiesVotes)} (${f(reportedVotesPerc)}%) votes were counted`
    const line6 = isProjectionVisible ? `By projection, ${losingCandidate} could be winning after ${f(projection)} more votes counted` : ''

    return `${line1}\n${line2}\n${line3}\n${line4}\n${line5} ${line5Addendum}\n${line6}`

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

  function getStateReportedVotesPercentage($state) {
    return $state.querySelector('.E2WDKf').textContent.match(/(\d+)%/)[1]
  }

  function getAllPartiesVotesOfState($state) {
    const $votes = $state.querySelectorAll(':scope > div')[1]
    const $biden = $votes.querySelectorAll(':scope > div')[0]
    const $trump = $votes.querySelectorAll(':scope > div')[1]
    const bidenVotes = getSectionVotes($biden)
    const trumpVotes = getSectionVotes($trump)
    const bidenVotesPerc = getSectionVotesPerc($biden)
    const trumpVotesPerc = getSectionVotesPerc($trump)
    const bothVotesPerc = bidenVotesPerc + trumpVotesPerc
    const bothVotes = bidenVotes + trumpVotes

    return Math.round((bothVotes * 100) / bothVotesPerc)
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
    return parseInt($voteSection.querySelectorAll(':scope > span')[1].textContent.replace(/[\.\,]/g, ''), 10)
  }

  function getSectionVotesPerc($voteSection) {
    return parseFloat(
      $voteSection
        .querySelectorAll(':scope > span')[0]
        .textContent.replace(/[\.\,]/g, '.')
        .replace('%', ''),
      10
    )
  }

  function getState($name) {
    return document.evaluate(`//span[text()="${$name}"]`, document, null, XPathResult.ANY_TYPE, null).iterateNext().parentNode.parentNode
  }

  function setStateVotes(name, vote1, vote2) {
    let $state = getState(name)
    const $votes = $state.querySelectorAll(':scope > div')[1]
    const $biden = $votes.querySelectorAll(':scope > div')[0]
    const $trump = $votes.querySelectorAll(':scope > div')[1]
    $biden.querySelectorAll(':scope > span')[1].innerText = vote1
    $trump.querySelectorAll(':scope > span')[1].innerText = vote2
  }
})()
