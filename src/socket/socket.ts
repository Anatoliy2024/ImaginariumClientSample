// import { API_URL } from "@/components/config"
// import { io } from "socket.io-client"

// const socket = io(API_URL, {
//   withCredentials: true,
//   reconnection: true,
//   reconnectionAttempts: 50,
//   reconnectionDelay: 5000,
//   reconnectionDelayMax: 10000,
//   timeout: 10000,
//   closeOnBeforeunload: true,
// })

// export default socket

// socket.ts
import { io, Socket } from "socket.io-client"
import { API_URL } from "@/components/config"

let socket: Socket | null = null

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(API_URL, {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 50,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 10000,
      timeout: 10000,
      // closeOnBeforeunload: true,//нужна ли?
    }) // Укажите URL вашего сервера
  }
  return socket
}

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
