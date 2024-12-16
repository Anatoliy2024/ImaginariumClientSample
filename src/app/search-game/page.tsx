"use client"
import { Layout } from "@/components/layout/layout"
import { UiButton } from "../ui/ui-button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getSocket } from "@/socket/socket"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { removeGameOption } from "@/features/gameOptions/gameOptions"
import useSocketRequest from "@/hooks/useSocketRequest"
import { Loading } from "@/components/svg/loading"

type GameSearchData = {
  payload: GameSearch
  type: string
}
type GameSearch = {
  nameGame: string
  type: string
  pack: string
  timer: string
  players: PlayersOption[]
}
type PlayersOption = {
  name: string
  avatar: string
  createPlayer: boolean
  socket: string
}

type gamesAll = {
  lobbyForGame: GameSearchData
}

export default function SearchGame() {
  const [games, setGames] = useState<GameSearchData | Record<string, never>>({})
  const router = useRouter()
  const socket = getSocket()
  const { sendRequest, isRequestInProgress } = useSocketRequest(socket)

  // console.log("games*", games)

  const dispatch = useAppDispatch()
  const { name, avatar } = useAppSelector((state) => state.playerOptions)
  const gameId = useAppSelector((state) => state.gameOption.gameId)

  useEffect(() => {
    async function getOpenLobby() {
      try {
        socket.emit("getLobby", {}, (data: gamesAll) => {
          // console.log("data**************", data)
          setGames(data.lobbyForGame)
        })
      } catch (e) {
        console.log(e)
      }
    }
    getOpenLobby()
  }, [socket])

  if (Object.keys(games).length > 0) {
    console.log("Object.entries(games)", Object.entries(games))
    return (
      <Layout className="min-w-[400px] min-h-[400px] bg-gray-800/70 flex flex-col  justify-between items-center rounded-2xl p-4">
        <h1>Поиск игры</h1>
        <div className=" flex flex-col  gap-4">
          {Object.entries(games).map((game, index) => {
            // console.log("keys", keys)
            // console.log("value", value)
            return (
              <div key={index} className="flex gap-5 ">
                <div>{(game[1] as GameSearch).nameGame}</div>
                <div>{(game[1] as GameSearch).players.length}</div>

                {!isRequestInProgress ? (
                  <UiButton
                    variant="auth"
                    className=""
                    onClick={() => {
                      if (name) {
                        sendRequest(
                          "joinGame",
                          {
                            nameGame: game[0],
                            player: { name, avatar, createPlayer: false },
                            gameId,
                          },
                          (data: Record<string, string>) => {
                            router.push("/lobby")
                            dispatch(removeGameOption())
                            if (localStorage.getItem("gameId")) {
                              localStorage.removeItem("gameId")
                            }
                            console.log(data)
                          }
                        )
                      } else {
                        alert("Пожалуйста войдите в свой аккаунт")
                      }
                    }}
                  >
                    Войти
                  </UiButton>
                ) : (
                  <UiButton variant="auth">
                    <Loading />
                  </UiButton>
                )}
              </div>
            )
          })}
        </div>
        <UiButton
          variant="auth"
          onClick={() => {
            router.push("/menu")
          }}
        >
          Назад
        </UiButton>
      </Layout>
    )
  }
  return (
    <Layout className="flex flex-col bg-gray-800/70 gap-5 ">
      <div className="text-white">Игр на найдено</div>
      <UiButton
        variant="auth"
        onClick={() => {
          router.push("/menu")
        }}
      >
        Назад
      </UiButton>
    </Layout>
  )
}
