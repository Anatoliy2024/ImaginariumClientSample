"use client"
import store from "@/store/store"
import { Provider } from "react-redux"
import { getSocket } from "../socket/socket"
import { useEffect } from "react"
import { AudioPlayer } from "@/components/audioPlayer/audio-player"
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const socket = getSocket()

    // Подписываемся на события
    socket.on("connect", () => {
      console.log("Соединение установлено")
      const user = localStorage.getItem("name")
      if (user) {
        console.log("отправка данных")
        socket.emit("playerOnline", user, () => {})
      }
    })

    socket.on("disconnect", () => {
      console.log("Соединение разорвано")
    })

    // Возвращаем функцию для отключения от сокета при размонтировании
    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
  }, [])
  // useEffect(()=>{},[])
  return (
    <>
      <Provider store={store}>
        {children}
        <AudioPlayer />
      </Provider>
    </>
  )
}
