"use client"
import { Chat } from "@/components/game/chat"
import { Game } from "@/components/game/game"
import { Map } from "@/components/game/map"
import { Layout } from "@/components/layout/layout"
import {
  // useAppDispatch,
  useAppSelector,
} from "@/store/hooks"
import { UiButton } from "../ui/ui-button"
import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { getSocket } from "@/socket/socket"
// import {
//   createGameReducer,
//   GameOptionsType,
// } from "@/features/gameOptions/gameOptions"
import { Crown } from "@/components/svg/crown"

export default function GameTable() {
  const router = useRouter()
  const statusGame = useAppSelector((state) => state.gameOption.statusGame)
  const playersInfo = useAppSelector((state) => state.gameOption.playersInfo)
  // const socket = getSocket()
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   const game = localStorage.getItem("gameId")
  //   console.log("object game", game)
  //   if (game) {
  //     socket.emit("getOptionGame", game, (data: GameOptionsType) => {
  //       console.log("getOptionGame", data)
  //       if (data) {
  //         dispatch(createGameReducer(data))
  //       } else {
  //         alert("Игра не найдена")
  //       }
  //     })
  //   } else {
  //     alert("Номер игры отсутствует")
  //   }
  // }, [])

  if (statusGame !== "gameOver" && statusGame && playersInfo) {
    return (
      <Layout className="flex-wrap gap-2  lg:gap-4 px-2 py-2">
        <Chat />
        <Game statusGame={statusGame} playersInfo={playersInfo} />
        <Map />
      </Layout>
    )
  } else if (playersInfo) {
    const sortedPlayers = [...playersInfo].sort((a, b) => b.points - a.points)
    const winnerPlayer =
      sortedPlayers[0].points > sortedPlayers[1].points
        ? sortedPlayers[0]
        : null
    return (
      <Layout className="flex flex-col gap-7 justify-center items-center bg-slate-950/70 text-white">
        <div>
          <div className="text-center">Результаты матча:</div>
          <div className="grid grid-cols-4 gap-x-20 gap-y-2 place-items-center">
            <div>Win</div>
            <div>Место</div>
            <div>Игрок</div>
            <div>Очков</div>
            {sortedPlayers.map((player, index) => {
              return (
                <>
                  <div className="">
                    {winnerPlayer?.name === player.name && (
                      <Crown colorText="#ffffff" />
                    )}
                  </div>
                  <div>{index + 1}</div>
                  <div> {player.name}</div>
                  <div>{player.points}</div>
                </>
              )
            })}
          </div>
        </div>
        <UiButton
          variant="menu"
          className="text-black"
          onClick={() => {
            router.push("/menu")
          }}
        >
          В главное меню
        </UiButton>
      </Layout>
    )
  } else {
    console.log("Ошибка")
    console.log("statusGame", statusGame)
    console.log("playersInfo", playersInfo)

    return (
      <Layout className="bg-slate-950/70 text-white flex-col gap-7">
        <div>Загрузка</div>
        <UiButton
          variant="menu"
          onClick={() => {
            router.push("/menu")
          }}
        >
          В главное меню
        </UiButton>
      </Layout>
    )
  }
}
