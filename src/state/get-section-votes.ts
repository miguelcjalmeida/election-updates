export default ($voteSection: Element) => {
  const voteLabel = $voteSection.querySelectorAll(':scope > span')[1]
  if (!voteLabel) throw new Error(`unable to find the vote span in ${$voteSection}`)
  return parseInt(voteLabel.textContent?.replace(/[\.\,]/g, '') ?? '0', 10)
}
