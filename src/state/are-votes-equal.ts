export default ($votes1, $votes2) => {
  return $votes1[0] == $votes2[0] && $votes1[1] === $votes2[1]
}
