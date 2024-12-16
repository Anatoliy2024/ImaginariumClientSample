import { PlayerType } from "@/features/gameOptions/gameOptions"

export function getColor(playersInfo: PlayerType[], player: string) {
  const foundPlayer = playersInfo?.find(
    (play: PlayerType) => play.name === player
  )
  let color
  if (foundPlayer) {
    color = foundPlayer.color // Только если игрок найден, присваиваем цвет
  } else {
    color = "#000000" // Цвет по умолчанию, если игрок не найден
  }
  return color
}
