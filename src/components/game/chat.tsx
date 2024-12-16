"use client"
import { UiButton } from "@/app/ui/ui-button"
import { changeChatInGame } from "@/features/gameOptions/gameOptions"
import { changeChatInLobby } from "@/features/lobbyPlayers/lobbyPlayers"
import useSocketRequest from "@/hooks/useSocketRequest"
import { getSocket } from "@/socket/socket"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import { Loading } from "../svg/loading"

export function Chat() {
  const [text, setText] = useState("")
  const [user, setUser] = useState("")
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const socket = getSocket()
  const dispatch = useAppDispatch()
  const { sendRequest, isRequestInProgress } = useSocketRequest(socket)

  const playerChatGame = useAppSelector((state) => state.gameOption.playerChat)
  const playerChatLobby = useAppSelector(
    (state) => state.lobbyPlayers.playerChat
  )
  const gameId = useAppSelector((state) => state.gameOption.gameId)
  const lobby = useAppSelector((state) => state.lobbyPlayers.lobby)
  const playerName = useAppSelector((state) => state.playerOptions.name)

  useEffect(() => {
    if (!playerName) {
      const userName = localStorage.getItem("name")
      if (userName) {
        setUser(userName)
      }
    }
  }, [])
  useEffect(() => {
    console.log("пришло сообщение")

    // Прокручиваем к последнему сообщению при изменении списка сообщений

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [playerChatGame, playerChatLobby])

  useEffect(() => {
    function handleChangeChatInGame(data: Record<string, []>) {
      dispatch(changeChatInGame(data))
    }
    function handleChangeChatInLobby(data: Record<string, []>) {
      dispatch(changeChatInLobby(data))
    }

    socket.on("changePlayerChatInGame", handleChangeChatInGame)
    socket.on("changePlayerChatInLobby", handleChangeChatInLobby)
    return () => {
      socket.off("changePlayerChatInGame", handleChangeChatInGame)
      socket.off("changePlayerChatInLobby", handleChangeChatInLobby)
    }
  }, [socket, dispatch])
  const playerChat = gameId ? playerChatGame : playerChatLobby

  function sendMessage(
    socket: Socket,
    playerName: string | null,
    user: string,
    text: string,
    gameId: string | null,
    lobby: string
  ) {
    if (text.length > 0) {
      try {
        sendRequest(
          "sendMessage",
          {
            name: playerName ? playerName : user,
            message: text,
            gameId: gameId ? gameId : lobby,
          },
          (data: Record<string, string>) => {
            if (data.message) {
              console.log(data.message)
            }
          }
        )
        setText("")
      } catch (e) {
        console.log(e)
      }
    } else {
      alert("Введите текст")
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(socket, playerName, user, text, gameId, lobby)
    }
  }

  return (
    <div className="flex-chat h-[300px]   sm:h-[600px] bg-slate-600/90 rounded-2xl p-3 flex flex-col ">
      <ul
        className="flex flex-col  text-slate-50 overflow-y-scroll custom-scrollbar  "
        id="chat"
      >
        {playerChat?.map((message, index) => {
          return (
            <div key={index} className="flex min-w-full">
              <div className="text-purple-400 max-w-1/4 overflow-hidden text-ellipsis">
                {message[0]}:
              </div>
              <div className="max-w-3/4 break-all">{message[1]}</div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </ul>
      <div className="mt-auto flex gap-2 w-full">
        <input
          className="w-3/4"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {!isRequestInProgress ? (
          <UiButton
            className="w-1/4"
            variant="chat"
            onClick={
              async () => {
                sendMessage(socket, playerName, user, text, gameId, lobby)
              }

              // if (text.length > 0) {
              //   socket.emit("sendMessage", {
              //     name: playerName ? playerName : user,
              //     message: text,
              //     gameId: gameId ? gameId : lobby,
              //   })
              //   setText("")
              // } else {
              //   alert("Введите текст")
              // }
            }
          >
            send
          </UiButton>
        ) : (
          <UiButton variant="chat">
            <Loading />
          </UiButton>
        )}
      </div>
    </div>
  )
}
