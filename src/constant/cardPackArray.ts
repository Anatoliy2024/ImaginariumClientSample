const ARRAY_PACK = [
  "classic",
  "persefona",
  "chimera",
  "fiveYear",
  "childhood",
  "odyssey",
  "ariadne",
  "pandora",
  "myFirst",
  "mySecond",
]

export function getRandomPack() {
  const randomIndex = Math.floor(Math.random() * ARRAY_PACK.length)
  return ARRAY_PACK[randomIndex]
}
