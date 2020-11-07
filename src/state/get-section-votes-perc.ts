export default ($voteSection: Element) => {
  const voteLabel = $voteSection.querySelectorAll(':scope > span')[0]
  if (!voteLabel) throw new Error(`unable to find the vote percentage span in ${$voteSection}`)
  return parseFloat(voteLabel.textContent?.replace(/[\.\,]/g, '.').replace('%', '') ?? '0')
}
