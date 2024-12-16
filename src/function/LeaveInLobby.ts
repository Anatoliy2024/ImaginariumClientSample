import {
  LobbyPlayersType,
  playerInfoInLobby,
} from "@/features/lobbyPlayers/lobbyPlayers"
import { Socket } from "socket.io-client"

export function leaveInLobby(
  playerName: string | null,
  createPlayer: playerInfoInLobby,
  socket: Socket,
  lobbyPlayers: LobbyPlayersType
) {
  if (playerName === createPlayer.name) {
    socket.emit(
      "closeLobby",
      { lobby: lobbyPlayers.lobby },
      (response: { message: string }) => {
        if (response) {
          // console.log(response.message)
          // console.log("lobbyForGame", response.lobbyForGame)
        } else {
          console.log("Ошибка закрытия комнаты")
        }
      }
    )
  } else {
    socket.emit(
      "disconnectLobby",
      { lobby: lobbyPlayers.lobby, playerName },
      (response: { message: string }) => {
        if (response) {
          console.log(response.message)
          // console.log("lobbyForGame", response.lobbyForGame)
        } else {
          console.log("Ошибка закрытия комнаты")
        }
      }
    )
  }
}
