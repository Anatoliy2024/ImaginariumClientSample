import { UiButton } from "@/app/ui/ui-button"
import {
  chooseHostCard,
  choosePlayerCard,
  clickCardPlayer,
  PackCardType,
  guessPlayerCard,
  nextRoundStartReduce,
  PlayerType,
  showResultReduce,
  playerLeave,
} from "@/features/gameOptions/gameOptions"
import { showStatusGame } from "@/function/showStatusGame"
import { getSocket } from "@/socket/socket"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Sight } from "../svg/sight"
import { Loading } from "../svg/loading"
import useSocketRequest from "@/hooks/useSocketRequest"
// import { getColor } from "@/function/getColor"
// import { BACKGROUND_COLOR } from "@/constant/color"

export function Game({
  statusGame,
  playersInfo,
}: {
  statusGame: string
  playersInfo: PlayerType[]
}) {
  const [timeNextRound, setTimeNextRound] = useState(7)
  const socket = getSocket()
  const dispatch = useAppDispatch()
  const { sendRequest, isRequestInProgress } = useSocketRequest(socket)
  const guessCardPlayers = useAppSelector(
    (state) => state.gameOption.guessCardPlayers
  )
  const gameId = useAppSelector((state) => state.gameOption.gameId)
  // const pickCardHost = useAppSelector((state) => state.gameOption.pickCardHost)
  const pickCardPlayers = useAppSelector(
    (state) => state.gameOption.pickCardPlayers
  )
  // const playersInfo = useAppSelector((state) => state.gameOption.playersInfo)
  // const pack = useAppSelector((state) => state.gameOption.pack)
  const round = useAppSelector((state) => state.gameOption.round)
  // const statusGame = useAppSelector((state) => state.gameOption.statusGame)
  const playerName = useAppSelector((state) => state.playerOptions.name)
  const user = playersInfo?.find(
    (player: PlayerType) => player.name === playerName
  )
  const createPlayer = playersInfo?.find(
    (player: PlayerType) => player.createPlayer
  )
  const userIndex = playersInfo?.findIndex(
    (player: PlayerType) => player.name === playerName
  )

  useEffect(() => {
    function handleHostChooseCardStatus(data: Record<string, string | []>) {
      dispatch(chooseHostCard(data))
    }
    // function hostChooseCardTwoPlayers(data: Record<string, string | []>) {
    //   dispatch(chooseHostCardTwoPlayers(data))
    // }
    function handlePlayerChooseCard(data: Record<string, string | []>) {
      dispatch(choosePlayerCard(data))
    }
    function handlePlayerGuessCard(data: Record<string, string | object>) {
      dispatch(guessPlayerCard(data))
    }
    function handleShowResult(data: Record<string, object | [] | string>) {
      dispatch(showResultReduce(data))
    }
    function handleNextRoundStart(data: Record<string, object | [] | string>) {
      dispatch(nextRoundStartReduce(data))
    }
    function handleGameOver(data: Record<string, object | [] | string>) {
      dispatch(showResultReduce(data))
    }
    function leavePlayerInGame(data: Record<string, object | [] | string>) {
      dispatch(playerLeave(data))
    }

    socket.on("hostChooseCardStatus", handleHostChooseCardStatus)
    // socket.on("hostChooseCardTwoPlayers", hostChooseCardTwoPlayers)
    // io.in(gameId).emit("hostChooseCardTwoPlayers", {
    //   pickCardPlayers: allGame[gameId].pickCardPlayers,
    //   statusGame: allGame[gameId].statusGame,
    // })
    socket.on("playerChooseCard", handlePlayerChooseCard)
    socket.on("playerGuessCard", handlePlayerGuessCard)
    socket.on("showResult", handleShowResult)
    socket.on("nextRoundStart", handleNextRoundStart)
    socket.on("gameOver", handleGameOver)
    socket.on("leavePlayerInGame", leavePlayerInGame)

    return () => {
      socket.off("hostChooseCardStatus", handleHostChooseCardStatus)
      // socket.off("hostChooseCardTwoPlayers", hostChooseCardTwoPlayers)
      socket.off("playerChooseCard", handleHostChooseCardStatus)
      socket.off("playerGuessCard", handlePlayerGuessCard)
      socket.off("showResult", handleShowResult)
      socket.off("nextRoundStart", handleNextRoundStart)
      socket.off("gameOver", handleGameOver)
      socket.off("leavePlayerInGame", leavePlayerInGame)
    }
  }, [socket, dispatch])

  useEffect(() => {
    // let timeoutId: NodeJS.Timeout
    let interval: NodeJS.Timeout

    if (statusGame === "showResult") {
      interval = setInterval(() => {
        setTimeNextRound((prev) => prev - 1)
      }, 1000)
      // if (createPlayer?.name === playerName) {
      //   timeoutId = setTimeout(() => {
      //     socket.emit("nextRound", gameId)
      //   }, 10000)
      // }
    }
    return () => {
      // clearTimeout(timeoutId)
      clearInterval(interval)
      setTimeNextRound(7)
    }
  }, [statusGame, socket, gameId, createPlayer, playerName])

  console.log("playersInfo", playersInfo)
  const playerActive = playersInfo?.find(
    (player: PlayerType) => player?.isPlayerActive
  )
  const playerNotActive = playersInfo?.find(
    (player: PlayerType) => !player?.isPlayerActive
  )
  console.log("pickCardPlayers", pickCardPlayers)

  // let countRound = null
  // if (user && playerNotActive) {
  //   if (playersInfo.length > 3) {
  //     countRound = user?.playerDeck.length
  //   } else if (playersInfo.length > 2) {
  //     countRound = user?.playerDeck.length
  //   } else {
  //     countRound = (pack as PackCardType[]).length / 5 + 1
  //   }
  // }

  if (
    !gameId ||
    user?.playerDeck === undefined ||
    playerNotActive === undefined ||
    pickCardPlayers === undefined ||
    playersInfo === undefined ||
    playerActive === undefined
  ) {
    return (
      <div className="flex-game min-h-[600px] bg-indigo-300/60 flex justify-center items-center   rounded-2xl">
        Загрузка...
      </div>
    )
  }

  return (
    <div className="flex-game min-h-[600px] bg-indigo-300/60 flex flex-col items-center p-3 gap-4 rounded-2xl bodyGame">
      {pickCardPlayers.length === 0 && (
        <div className="w-[150px] h-[293px]"></div>
      )}
      {pickCardPlayers.length > 0 && playersInfo.length !== 2 && (
        <div className="flex gap-1  flex-wrap justify-center  ">
          {pickCardPlayers.map(
            ([name, card]: [string[], PackCardType[]], index) => {
              console.log("name", name)
              console.log("value", card)

              const findPLayer = playersInfo.find(
                (player) => player.name === name[0]
              )
              let backgroundColor = "#000"
              if (findPLayer) {
                backgroundColor = findPLayer.color
              }

              // const textColor = BACKGROUND_COLOR[backgroundColor]
              return (
                <div
                  key={index}
                  className="relative flex flex-col gap-1 max-sm:hover:even:-translate-x-10 max-sm:hover:odd:translate-x-10 max-sm:hover:z-10 duration-700"
                >
                  <div
                    className=""
                    onClick={() => {
                      if (
                        statusGame === "guessCard" &&
                        playerName !== playerActive?.name &&
                        name[0] !== playerName
                      ) {
                        dispatch(clickCardPlayer({ card: card[0], userIndex }))
                      } else {
                        alert(
                          "Сейчас не стадия выбора, либо вы являетесь ведущим, либо данная карта ваша"
                        )
                      }
                    }}
                  >
                    <Image
                      priority
                      quality={100}
                      loading="eager"
                      src={
                        statusGame === "guessCard" ||
                        statusGame === "showResult"
                          ? card[0].src
                          : card[0].shirt
                      }
                      alt="card"
                      width={150}
                      height={225}
                      className={clsx(
                        "rounded-xl overflow-hidden",
                        statusGame === "guessCard"
                          ? "transform transition-transform duration-300 hover:scale-[1.8] sm:hover:scale-[2] hover:z-10 sm:hover:translate-y-36 relative"
                          : "",
                        user?.clickCard?.id === card[0].id
                          ? "shadow-custom-1  shadow-cyan-200"
                          : ""
                      )}
                    />
                  </div>
                  {statusGame !== "guessCard" && (
                    <div
                      className="text-center rounded-2xl max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{
                        color: "#000",
                        // textColor,
                        background: backgroundColor,
                        fontWeight: 700,
                      }}
                    >
                      {name[0]}
                    </div>
                  )}
                  {statusGame === "showResult" && (
                    <div className="absolute top-0 left-12">
                      {Object.entries(guessCardPlayers)
                        .filter((player) => {
                          const user = player[0]
                          const cardPlayer = player[1]

                          if (card[0].id === cardPlayer.id) {
                            return user
                          }
                        })
                        .map((player, index) => {
                          const findPLayer = playersInfo.find(
                            (user) => user.name === player[0]
                          )
                          let backgroundColor = "#000"
                          if (findPLayer) {
                            backgroundColor = findPLayer.color
                          }
                          return (
                            <div
                              key={index}
                              className="bg-slate-950 rounded-full"
                            >
                              <Sight textColor={backgroundColor} />
                            </div>
                          )
                        })}
                    </div>
                  )}
                  {statusGame === "guessCard" &&
                    guessCardPlayers[playerName as string]?.id === card[0].id &&
                    user && (
                      <div className="absolute top-20 left-14">
                        {
                          <div
                            key={index}
                            className="bg-slate-950/90  rounded-full"
                          >
                            <Sight textColor={user.color} />
                          </div>
                        }
                      </div>
                    )}
                </div>
              )
            }
          )}
        </div>
      )}
      {pickCardPlayers.length > 0 && playersInfo.length === 2 && (
        <>
          {" "}
          <div className="flex gap-1 flex-wrap ">
            {pickCardPlayers.map(
              ([name, card]: [string[], PackCardType[]], index) => {
                console.log("name", name)
                console.log("value", card)

                if (!playerActive) {
                  return <div key={index}>Пусто</div>
                }

                const rightChose = Object.entries(guessCardPlayers).filter(
                  (cardPlayer) => {
                    if (cardPlayer[1].id === card[0].id) {
                      return cardPlayer
                    }
                  }
                )
                console.log("name[0]", name[0])
                return (
                  <div
                    key={index}
                    className="relative flex flex-col gap-1 max-sm:hover:even:-translate-x-10 max-sm:hover:odd:translate-x-10 max-sm:hover:z-10 duration-700"
                  >
                    <div
                      className=""
                      onClick={() => {
                        if (
                          (statusGame === "hostChoosesCard" &&
                            playerName === playerActive?.name) ||
                          (statusGame === "guessCard" &&
                            playerName !== playerActive?.name)
                        ) {
                          dispatch(
                            clickCardPlayer({ card: card[0], userIndex })
                          )
                        } else {
                          alert("Сейчас не стадия выбора")
                        }
                      }}
                    >
                      <Image
                        priority
                        quality={100}
                        loading="eager"
                        src={
                          (statusGame === "hostChoosesCard" &&
                            playerActive.name === playerName) ||
                          statusGame === "guessCard" ||
                          statusGame === "showResult"
                            ? card[0].src
                            : card[0].shirt
                        }
                        alt="card"
                        width={150}
                        height={225}
                        className={clsx(
                          "rounded-xl overflow-hidden",
                          statusGame === "guessCard" ||
                            (statusGame === "hostChoosesCard" &&
                              playerActive.name === playerName)
                            ? "transform transition-transform duration-300 hover:scale-[1.8] sm:hover:scale-[2] hover:z-10 sm:hover:translate-y-36 relative"
                            : "",
                          user?.clickCard?.id === card[0].id
                            ? "shadow-custom-1  shadow-cyan-200"
                            : ""
                        )}
                      />
                    </div>
                    {name[0] && statusGame === "showResult" && (
                      <div
                        className="text-center rounded-2xl max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{
                          color: "#000",
                          // textColor,
                          background: playerActive.color,
                          fontWeight: 700,
                        }}
                      >
                        {name[0]}
                      </div>
                    )}
                    {((statusGame === "guessCard" &&
                      playerActive.name !== playerName) ||
                      statusGame === "showResult") &&
                      user &&
                      rightChose.map((card, index) => {
                        return (
                          <div
                            key={index}
                            className={clsx(
                              "absolute right-12",
                              +card[0] === 1
                                ? "top-0 "
                                : +card[0] === 2
                                ? "top-12"
                                : +card[0] === 3
                                ? "top-24"
                                : ""
                            )}
                          >
                            {
                              <div
                                key={index}
                                className="bg-slate-950/90  rounded-full"
                              >
                                <Sight textColor={playerNotActive.color} />
                              </div>
                            }
                          </div>
                        )
                      })}
                  </div>
                )
              }
            )}
          </div>
          {statusGame === "guessCard" && (
            <div className="flex gap-3">
              {new Array(Math.abs(Object.keys(guessCardPlayers).length - 3))
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="bg-slate-950/90  rounded-full">
                    <Sight textColor={playerNotActive.color} />
                  </div>
                ))}
            </div>
          )}
        </>
      )}
      <div className="flex items-center justify-around w-full">
        <div>{statusGame ? showStatusGame(statusGame) : ""}</div>
        <div>Раундов:{round}</div>
        {!isRequestInProgress && (
          <UiButton
            variant="auth"
            onClick={() => {
              // console.log(
              //   "guessCardPlayers[playerName]",
              //   guessCardPlayers[playerName]
              // )
              // console.log("playerName", playerName)
              const pickCard = pickCardPlayers.filter(
                (player) => player[0][0] === playerName
              )
              if (
                statusGame === "hostChoosesCard" &&
                playerActive?.name === playerName
              ) {
                if (playerActive.clickCard) {
                  // try {
                  sendRequest(
                    "hostChooseCard",
                    {
                      player: playerActive,
                      gameId,
                    },
                    (data) => {
                      if (data.message) {
                        console.log(data.message)
                      }
                    }
                  )
                  console.log("Ходит активный игрок")
                  // } catch (e) {
                  //   console.log(e)
                  // }
                } else {
                  alert("Вы не выбрали карту")
                }
              } else if (
                statusGame === "playersChooseCard" &&
                playerActive?.name !== playerName &&
                ((pickCard.length === 0 && playersInfo.length !== 3) ||
                  (pickCard.length < 2 &&
                    (pickCard?.[0]?.[1]?.[0] as { id?: number })?.id !==
                      user.clickCard.id &&
                    playersInfo.length === 3))
              ) {
                if (user?.clickCard) {
                  console.log(
                    " pickCardPlayers.filter((player) => player[0][0] === playerName)",
                    pickCardPlayers.filter(
                      (player) => player[0][0] === playerName
                    )
                  )
                  // try {
                  sendRequest(
                    "playerChooseCard",
                    {
                      clickCard: user.clickCard,
                      player: user,
                      gameId,
                    },
                    (data) => {
                      if (data.message) {
                        console.log(data.message)
                      }
                    }
                  )
                  console.log("Ходит обычный игрок")
                  // } catch (e) {
                  //   console.log(e)
                  // }
                } else {
                  alert("Вы не выбрали карту")
                }
              } else if (
                statusGame === "guessCard" &&
                user?.clickCard &&
                playerName !== playerActive?.name &&
                playerName !== null
              ) {
                if (!guessCardPlayers[playerName] || playersInfo.length === 2) {
                  // console.log("guessCardPlayers", guessCardPlayers)
                  // console.log("playerName", playerName)
                  // try {
                  sendRequest("guessCard", { gameId, user }, (data) => {
                    if (data.message) {
                      console.log(data.message)
                    }
                  })
                  console.log("Отправка выбора на сервер")
                  // } catch (e) {
                  //   console.log(e)
                  // }
                } else {
                  alert("Сейчас не время выбора")
                }
              } else if (statusGame === "showResult") {
                // socket.emit("nextRound", gameId)
              } else {
                alert("Сейчас не время выбора")
              }
            }}
          >
            {statusGame !== "showResult"
              ? "Выбрать карту"
              : `Следующий раунд (${timeNextRound})`}
          </UiButton>
        )}

        {isRequestInProgress && (
          <UiButton variant="auth">
            <Loading />
          </UiButton>
        )}
      </div>

      {user?.playerDeck.length > 0 && (
        <div className="flex  gap-1 flex-wrap justify-center">
          {user?.playerDeck.map((card: Record<string, string>, index) => {
            const isIdEqual = Number(user?.clickCard?.id) === Number(card.id)
            return (
              <div
                key={index}
                className={clsx(
                  "max-sm:hover:even:-translate-x-10 max-sm:hover:odd:translate-x-10 max-sm:hover:z-10 duration-700"
                )}
                onClick={() => {
                  if (
                    statusGame !== "guessCard" &&
                    statusGame !== "showResult"
                  ) {
                    dispatch(clickCardPlayer({ card, userIndex }))
                  } else {
                    alert("Сейчас другая стадия")
                  }
                }}
              >
                <Image
                  priority
                  quality={100}
                  loading="eager"
                  src={card?.src}
                  alt="card"
                  width={150}
                  height={225}
                  className={clsx(
                    "transform transition-transform duration-300 hover:scale-[1.8] sm:hover:scale-[2] hover:z-10 sm:hover:-translate-y-36 relative rounded-xl   max-h-[225px]",
                    isIdEqual ? "shadow-custom-1  shadow-cyan-200" : ""
                  )}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
