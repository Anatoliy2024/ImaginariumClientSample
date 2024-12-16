"use client"
import Image from "next/image"
import { Profile } from "../profile/profile"
import { ArrowDownIcon } from "../svg/arrow-down-icon"
import { useEffect, useRef, useState } from "react"
import { UiButton } from "../../app/ui/ui-button"
import { useRouter } from "next/navigation"
import { getSocket } from "@/socket/socket"

import { getCountPlayer } from "../../features/playerOnline/playerOnlineSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  changePlayer,
  logOutPlayer,
} from "@/features/playerOptions/playerOptionsSlice"
import { usePathname } from "next/navigation"
import {
  closeLobbyReducer,
  createLobbyReduce,
  playerInfoInLobby,
} from "@/features/lobbyPlayers/lobbyPlayers"
import { changeShowAudioPlayer } from "@/features/audioPlayer/audioPlayer"

import { leaveInLobby } from "@/function/LeaveInLobby"
import {
  createGameReducer,
  GameOptionsType,
} from "@/features/gameOptions/gameOptions"
// import { changeLobbyReducer } from "@/features/lobbyPlayers/lobbyPlayers"
import { Home } from "../svg/home"
import { Feet } from "../svg/feet"
import { API_URL } from "../config"
// import { PlayerOn } from "../audioPlayer/svg/playerOn"
import { MusicSVG } from "../audioPlayer/svg/music"
import { UiButtonHeader } from "@/app/ui/ui-button-header"
// import { AudioPlayer } from "./audioPlayer/audio-player"
export function Header() {
  const [showPlayers, setShowPlayers] = useState(false)
  const timerActive = useRef(true)
  // const [name, setName] = useState<string | null>(null)
  // const [avatar, setAvatar] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const socket = getSocket()

  const dispatch = useAppDispatch()
  const playersOnline = useAppSelector((state) => state.playersOnline.value)
  const playersList = useAppSelector((state) => state.playersOnline.playersList)
  const { name, avatar } = useAppSelector((state) => state.playerOptions)
  const lobbyPlayers = useAppSelector((state) => state.lobbyPlayers)
  // const gameId = useAppSelector((state) => state.gameOption.gameId)
  // const gameOption = useAppSelector((state) => state.gameOption)
  const createPlayer = lobbyPlayers.players.find(
    (player) => player.createPlayer
  )

  useEffect(() => {
    const changePlayersOnline = (count: object) => {
      // console.log("Object.values(count)", Object.values(count))

      dispatch(getCountPlayer(Object.values(count)))

      // const value = Object.keys(count).length // Получаем количество игроков
      // dispatch(getCountPlayer(value))

      const name = localStorage.getItem("name")

      if (pathname === "/" && name) {
        router.push("/menu")
      }
      // console.log("value", value)
    }

    const changePlayersInLobby = (data: Record<string, string | []>) => {
      console.log("Изменение игроков в лобби", data)
      dispatch(createLobbyReduce(data))
      // dispatch(changeLobbyReducer(data))
    }
    const closeLobbyCreatePlayer = (data: Record<string, string>) => {
      console.log("Создатель вышел", data)
      dispatch(closeLobbyReducer())
      router.push("/menu")
    }
    const startGame = (data: GameOptionsType) => {
      console.log("StartGame", data)
      dispatch(createGameReducer(data))
      console.log("data", data)
      if (data.gameId) {
        localStorage.setItem("gameId", data.gameId)
      }
      dispatch(closeLobbyReducer())
      router.push("/game-table")
    }

    // const playerLiveInLobby = (data: any) => {
    //   console.log("disconectPlayer", data)
    //   dispatch(changeLobbyReducer(data))

    // }

    socket.on("changePlayersOnline", changePlayersOnline)
    socket.on("changePlayersInLobby", changePlayersInLobby)
    socket.on("closeLobbyCreatePlayers", closeLobbyCreatePlayer)
    socket.on("createGameInServer", startGame)
    // socket.on("playerLiveInLobby", playerLiveInLobby)

    // Убираем слушатель при размонтировании компонента
    return () => {
      socket.off("changePlayersOnline", changePlayersOnline)
      socket.off("changePlayersInLobby", changePlayersInLobby)
      socket.off("closeLobbyCreatePlayers", closeLobbyCreatePlayer)
      socket.off("createGameInServer", startGame)

      // socket.off("playerLiveInLobby", playerLiveInLobby)
    }
  }, [socket, dispatch])

  function logOut() {
    localStorage.removeItem("gameId")
    localStorage.removeItem("name")
    localStorage.removeItem("token")
    localStorage.removeItem("avatar")

    router.push("/")

    socket.emit("playerOffline", name, (data: Record<string, string>) => {
      if (data.message) {
        console.log("data.message", data.message)
      }
    })
    dispatch(logOutPlayer())
    if (localStorage.getItem("playerCreateGame")) {
      localStorage.removeItem("playerCreateGame")
    }
  }

  useEffect(() => {
    const name = localStorage.getItem("name")
    const avatar = localStorage.getItem("avatar")
    const token = localStorage.getItem("token")
    // добавил
    // let game = null
    // if (localStorage.getItem("gameId")) {
    //   game = localStorage.getItem("gameId")
    // }

    // if (avatarSrc === "") {
    //   setAvatar("not")
    // }

    if (name) {
      dispatch(changePlayer({ name, avatar, token, game: null }))

      // setName(nameLogin)
      // setAvatar(avatarSrc)
    }

    const game = localStorage.getItem("gameId")
    console.log("object game", game)
    if (game) {
      socket.emit("getOptionGame", game, (data: GameOptionsType) => {
        console.log("getOptionGame", data)
        if (data) {
          dispatch(createGameReducer(data))
        } else {
          alert("Игра не найдена")
        }
      })
    }
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    function startDynamicTimer() {
      // const randomNumber = Math.floor(Math.random() * (14 - 10 + 1)) + 10 // Генерируем случайный интервал
      const randomNumber = Math.floor(Math.random() * (5 - 3 + 1)) + 3 // 3,4,5
      console.log(
        "Таймер запущен. Следующее выполнение через:",
        randomNumber,
        "минут"
      )

      timeoutId = setTimeout(() => {
        console.log("Счётчик заработал с интервалом:", randomNumber, "минут")
        // Выполняем нужную логику...

        if (playersOnline > 0 && timerActive.current) {
          fetch(`${API_URL}/tic-tac`)
            .then((data) => data.json())
            .then((data) => {
              console.log("Ответ:", data)
            })
            .catch((error) => {
              console.error("Ошибка:", error)
            })

          startDynamicTimer() // Перезапуск таймера
        } else {
          timerActive.current = false // Остановка таймера, если игроков нет
          console.log("Таймер остановлен, так как игроков больше нет.")
        }
      }, randomNumber * 60000)
    }

    startDynamicTimer()

    return () => {
      timerActive.current = false
      clearTimeout(timeoutId)
      console.log("Таймер очищен при размонтировании компонента.")
    }
  }, [])

  return (
    <div className="absolute top-0 bg-emerald-600  w-full h-16 flex items-center px-2 sm:px-5 text-5xl">
      <div className="flex gap-3 sm:gap-10 select-none">
        <div className="flex gap-4 ">
          <div className="rounded-full overflow-hidden h-[55px] w-[55px] bg-slate-900/70">
            <Image src="/logo2.png" width={100} height={100} alt="icons" />
          </div>
          <div className="max-md:hidden">Imaginarium</div>
        </div>

        <div
          className="relative"
          // onClick={() => setShowPlayers((prev) => !prev)}
          onMouseEnter={() => setShowPlayers(true)}
          onMouseLeave={() => setShowPlayers(false)}
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5  bg-[#e4ff9c]  rounded-full  shadow-custom-1 border border-yellow-400"></div>
            <div>{playersOnline}</div>
          </div>

          {showPlayers && name === "1" && (
            <ul className="absolute -top-1 left-12  bg-indigo-500/85 rounded-2xl min-w-28  max-h-[500px] overflow-y-scroll p-1 text-center playersList z-30">
              {playersList.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          )}
        </div>

        {name && (
          <div className="flex gap-2">
            <UiButtonHeader
              title="Музыкальный плеер"
              onClick={() => {
                dispatch(changeShowAudioPlayer(true))
              }}
            >
              <MusicSVG />
              {/* <PlayerOn /> */}
            </UiButtonHeader>
            <UiButtonHeader
              title="Вернуться в игру"
              onClick={() => {
                const game = localStorage.getItem("gameId")

                // router.push("/game-table")
                console.log("gameId", game)
                if (game) {
                  socket.emit(
                    "getOptionGame",
                    game,
                    (data: GameOptionsType) => {
                      console.log("getOptionGame", data)
                      if (data) {
                        dispatch(createGameReducer(data))
                        router.push("/game-table")
                      } else {
                        alert("Игра не найдена")
                      }
                    }
                  )
                } else {
                  alert("Номер игры отсутствует")
                }

                // socket.emit("getOptionGame", gameId, (data) => {
                //   if (data) {
                //     dispatch(createGameReducer(data))
                //     router.push("/table-game")
                //   } else {
                //     alert("Игра не найдена")
                //   }
                // })
              }}
            >
              <Feet />
            </UiButtonHeader>
            <UiButtonHeader
              title="Выйти в меню"
              onClick={() => {
                if (pathname === "/lobby") {
                  leaveInLobby(
                    name,
                    createPlayer as playerInfoInLobby,
                    socket,
                    lobbyPlayers
                  )
                }
                router.push("/menu")
              }}
            >
              <Home />
            </UiButtonHeader>
          </div>
        )}
      </div>
      <div className="ml-auto flex gap-2 items-center  max-w-45">
        {name && (
          <div className="flex flex-col relative  group z-30">
            <div className=" flex items-center gap-3 cursor-pointer ">
              <Profile name={name} avatar={avatar} />
              <ArrowDownIcon />
            </div>

            <div className="absolute top-[50px] right-px hidden group-hover:block ">
              <div
                className=" rounded-xl   hover:bg-emerald-400 active:bg-emerald-600 select-none p-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  if (pathname === "/lobby") {
                    leaveInLobby(
                      name,
                      createPlayer as playerInfoInLobby,
                      socket,
                      lobbyPlayers
                    )
                  }

                  router.push("/option-player")
                }}
              >
                Изменить аватарку
              </div>

              <div
                className=" rounded-xl   hover:bg-emerald-400 active:bg-emerald-600 select-none p-2 cursor-pointer"
                onClick={() => {
                  if (pathname === "/lobby") {
                    leaveInLobby(
                      name,
                      createPlayer as playerInfoInLobby,
                      socket,
                      lobbyPlayers
                    )
                  }
                  logOut()
                }}
              >
                Выйти
              </div>
            </div>
          </div>
        )}
        {!name && (
          <div className=" flex items-center gap-2">
            <UiButton
              variant="auth"
              onClick={(e) => {
                e.preventDefault()
                console.log("регистрация")
                router.push("/registration")
              }}
            >
              РЕГ
            </UiButton>
            <UiButton
              variant="auth"
              onClick={(e) => {
                e.preventDefault()
                router.push("/login")
              }}
            >
              Войти
            </UiButton>
          </div>
        )}
      </div>
    </div>
  )
}
