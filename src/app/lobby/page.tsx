"use client"
import { Layout } from "@/components/layout/layout"
import { getSocket } from "@/socket/socket"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

import { UiButton } from "../ui/ui-button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Chat } from "@/components/game/chat"
import { closeLobbyReducer } from "../../features/lobbyPlayers/lobbyPlayers"
import { leaveInLobby } from "@/function/LeaveInLobby"
import useSocketRequest from "@/hooks/useSocketRequest"
import { Loading } from "@/components/svg/loading"
export default function Lobby() {
  const router = useRouter()

  const socket = getSocket()
  const dispatch = useAppDispatch()
  const { sendRequest, isRequestInProgress } = useSocketRequest(socket)
  const playerName = useAppSelector((state) => state.playerOptions.name)
  const lobbyPlayers = useAppSelector((state) => state.lobbyPlayers)

  const players = lobbyPlayers.players
  const createPlayer = lobbyPlayers.players.find(
    (player) => player.createPlayer
  )

  const maneGame = lobbyPlayers.nameGame

  if (!lobbyPlayers.nameGame || !createPlayer) {
    console.log("Ошибка")
    console.log("lobbyPlayers.nameGame", lobbyPlayers.nameGame)
    console.log("createPlayer", createPlayer)
    return (
      <Layout className="  flex  gap-6 px-3">
        <div className="flex-game bg-gray-800/70 w-56  h-56 p-5 rounded-2xl">
          <div className="text-center">Ошибка</div>
          <UiButton
            variant="auth"
            onClick={() => {
              router.push("/menu")
            }}
          >
            Назад
          </UiButton>
        </div>
      </Layout>
    )
  }

  return (
    <Layout className="w-full h-[600px]  flex  gap-6 px-3 pt-5 flex-wrap">
      <Chat />
      <div className="flex-game bg-gray-800/70 min-h-[600px] flex flex-col rounded-2xl">
        <h1 className="text-neutral-50 text-center">Lobby game: {maneGame}</h1>
        <div className="text-neutral-50 flex flex-col gap-4">
          {players.map((player, index) => {
            return (
              <div className="flex  gap-10 px-24" key={index}>
                <div>{index + 1}</div>
                <div className="rounded-full overflow-hidden ">
                  <Image
                    src={player.avatar}
                    alt="avatar"
                    width={70}
                    height={70}
                  ></Image>
                </div>

                <div>{player.name}</div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-4 justify-center mt-auto py-3">
          {playerName === createPlayer.name && !isRequestInProgress && (
            <UiButton
              variant="auth"
              className=""
              onClick={() => {
                if (
                  (players.length > 2 && players.length < 9) ||
                  playerName === "1" ||
                  playerName === "Adgika"
                ) {
                  sendRequest("createGame", { lobby: lobbyPlayers })
                } else {
                  alert("Минимальное количество участников 4")
                }
              }}
            >
              Старт
            </UiButton>
          )}
          {playerName === createPlayer.name && isRequestInProgress && (
            <UiButton variant="auth">
              <Loading />
            </UiButton>
          )}

          <UiButton
            variant="auth"
            onClick={() => {
              leaveInLobby(playerName, createPlayer, socket, lobbyPlayers)

              // if (playerName === createPlayer.name) {
              //   socket.emit(
              //     "closeLobby",
              //     { lobby: lobbyPlayers.lobby },
              //     (response: { message: string; lobbyForGame: any }) => {
              //       if (response) {
              //         // console.log(response.message)
              //         // console.log("lobbyForGame", response.lobbyForGame)
              //       } else {
              //         console.log("Ошибка закрытия комнаты")
              //       }
              //     }
              //   )
              // } else {
              //   socket.emit(
              //     "disconnectLobby",
              //     { lobby: lobbyPlayers.lobby, playerName },
              //     (response: { message: string }) => {
              //       if (response) {
              //         console.log(response.message)
              //         // console.log("lobbyForGame", response.lobbyForGame)
              //       } else {
              //         console.log("Ошибка закрытия комнаты")
              //       }
              //     }
              //   )
              // }
              dispatch(closeLobbyReducer())
              router.push("/menu")
            }}
          >
            Назад
          </UiButton>
        </div>
      </div>
    </Layout>
  )
}
