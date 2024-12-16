"use client"
// import axios from "axios"
import { Layout } from "../../components/layout/layout"
import { UiButton } from "../ui/ui-button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getSocket } from "@/socket/socket"
// import { Socket } from "socket.io-client"
import { createLobbyReduce } from "../../features/lobbyPlayers/lobbyPlayers"
import { removeGameOption } from "@/features/gameOptions/gameOptions"
import { getRandomPack } from "@/constant/cardPackArray"
import useSocketRequest from "@/hooks/useSocketRequest"
import { Loading } from "@/components/svg/loading"
type OptionType = Record<string, string | undefined>
// import _ from "lodash"

export default function OptionGame() {
  const [optionGame, setOptionGame] = useState({
    nameGame: "",
    type: "classic",
    pack: getRandomPack(),
    timer: "one",
  })
  const router = useRouter()
  const socket = getSocket()
  const dispatch = useAppDispatch()
  const name = useAppSelector((state) => state.playerOptions.name)
  const avatar = useAppSelector((state) => state.playerOptions.avatar)
  const gameId = useAppSelector((state) => state.gameOption.gameId)
  // const [isCreatingGame, setIsCreatingGame] = useState(false)
  const { sendRequest, isRequestInProgress } = useSocketRequest(socket)
  // console.log(optionGame)
  // console.log(name, avatar)
  // const createLobby = _.throttle(async function (
  //   name: string | null,
  //   avatar: string,
  //   optionGame: OptionType,
  //   socket: Socket
  // ) {
  //   try {
  //     // if (isCreatingGame) return
  //     // setIsCreatingGame(true)
  //     if (name) {
  //       socket.emit(
  //         // sendRequest(
  //         "createLobby",
  //         { name, avatar, optionGame },
  //         (data: Record<string, string | []>) => {
  //           //change
  //           dispatch(createLobbyReduce(data))
  //           dispatch(removeGameOption())

  //           // console.log(data)
  //           //изменил
  //           if (localStorage.getItem("gameId")) {
  //             localStorage.removeItem("gameId")
  //           }
  //           router.push("/lobby")
  //         }
  //       )
  //     } else {
  //       alert("Пожалуйста войдите в свой аккаунт")
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   // finally {
  //   //   setIsCreatingGame(false)
  //   // }
  // },
  // 10000)

  async function createLobby(
    name: string | null,
    avatar: string,
    optionGame: OptionType
  ) {
    try {
      if (name) {
        sendRequest(
          "createLobby",
          { name, avatar, optionGame, gameId },
          (data: Record<string, string | []>) => {
            //change
            dispatch(createLobbyReduce(data))
            dispatch(removeGameOption())

            // console.log(data)
            //изменил
            if (localStorage.getItem("gameId")) {
              localStorage.removeItem("gameId")
            }
            router.push("/lobby")
          }
        )
      } else {
        alert("Пожалуйста войдите в свой аккаунт")
      }
    } catch (e) {
      console.log(e)
    }
    // finally {
    //   setIsCreatingGame(false)
    // }
  }
  // async function createLobby(
  //   name: string | null,
  //   avatar: string,
  //   optionGame: OptionType,
  //   socket: Socket
  // ) {
  //   // if (isCreatingGame) return

  //   // setIsCreatingGame(true)

  //   try {
  //     // if (isCreatingGame) return
  //     // setIsCreatingGame(true)
  //     if (name) {
  //       socket.emit(
  //         // sendRequest(
  //         "createLobby",
  //         { name, avatar, optionGame },
  //         (data: Record<string, string | []>) => {
  //           //change
  //           dispatch(createLobbyReduce(data))
  //           dispatch(removeGameOption())

  //           // console.log(data)
  //           //изменил
  //           if (localStorage.getItem("gameId")) {
  //             localStorage.removeItem("gameId")
  //           }
  //           router.push("/lobby")
  //         }
  //       )
  //     } else {
  //       alert("Пожалуйста войдите в свой аккаунт")
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   // finally {
  //   //   setIsCreatingGame(false)
  //   // }
  // }

  return (
    <Layout className="min-w-[400px] min-h-[400px] bg-gray-800/70 flex flex-col justify-center items-center gap-3 py-6 rounded-xl">
      <div>
        <label htmlFor="type" className="pr-3">
          Тип
        </label>
        <select
          disabled
          name=""
          id="type"
          onChange={(e) => {
            setOptionGame((prev) => ({ ...prev, type: e.target.value }))
            console.log("Изменение Типа")
          }}
          defaultValue="classic"
        >
          <option value="classic">Классика</option>
          <option value="cardText">Карты с текстом</option>
        </select>
      </div>
      <div>
        <label htmlFor="pack" className="pr-3">
          Колода
        </label>
        <select
          name=""
          id="pack"
          onChange={(e) => {
            if (e.target.value !== "random") {
              setOptionGame((prev) => ({ ...prev, pack: e.target.value }))
              console.log("Изменение Колоды")
            } else {
              setOptionGame((prev) => ({
                ...prev,
                pack: getRandomPack(),
              })) //при добавлении колоды нужно добавить её в const ARRAY_PACK
            }
          }}
          // defaultValue="random"
        >
          <option value="random">Рандом</option>
          <option value="classic">Классика</option>
          <option value="persefona">Персефона</option>
          <option value="chimera">Химера</option>
          {/* <option value="multfilm">Mультфильм</option> */}
          <option value="fiveYear">5 лет</option>
          <option value="childhood">Детство</option>
          <option value="odyssey">Одиссея</option>
          <option value="ariadne">Ариадна</option>
          <option value="pandora">Пандора</option>
          <option value="myFirst">myFirst</option>
          <option value="mySecond">mySecond</option>
          <option value="myThird">myThird</option>
          <option value="myFourth">myFourth</option>
          <option value="myFifth">myFifth</option>
          <option value="mySixth">mySixth</option>
          <option value="mySeventh">mySeventh</option>
          <option value="myEighth">myEighth</option>
          <option value="myNinth">myNinth</option>
          <option value="myTenth">myTenth</option>
          <option value="myEleventh">myEleventh</option>
          <option value="myTwelfth">myTwelfth</option>
          <option value="myThirteenth">myThirteenth</option>
          <option value="myFourteenth">myFourteenth</option>
          <option value="myFifteenth">myFifteenth</option>
          <option value="mySixteenth">mySixteenth</option>
        </select>
      </div>
      <div className="flex gap-4">
        <label htmlFor="timer">Время на ход</label>
        <select
          disabled
          name=""
          id="timer"
          onChange={(e) => {
            setOptionGame((prev) => ({ ...prev, timer: e.target.value }))

            console.log("Изменение времени")
          }}
          defaultValue="one"
        >
          <option value="one">1 мин</option>
          <option value="two">2 мин</option>
          <option value="three">3 мин</option>
          <option value="four">4 мин</option>
          <option value="five">5 мин</option>
        </select>
      </div>

      <div className="flex gap-2">
        <label htmlFor="nameGame">Название</label>
        <input
          value={optionGame.nameGame}
          type="text"
          id="nameGame"
          className="w-44"
          onChange={(e) =>
            setOptionGame((prev) => ({ ...prev, nameGame: e.target.value }))
          }
        />
      </div>
      <div className="flex gap-3">
        {!isRequestInProgress ? (
          <UiButton
            variant="auth"
            onClick={() => {
              if (optionGame.nameGame.length > 0) {
                createLobby(name, avatar, optionGame)
              } else {
                alert("Введите название игры")
              }
            }}
          >
            Создать
          </UiButton>
        ) : (
          <UiButton variant="auth">
            <Loading />
          </UiButton>
        )}
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
