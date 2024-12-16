import { useState } from "react"
import { Socket } from "socket.io-client"

// type SocketRequestData = {
//   [key: string]: string | number | boolean | object | null | undefined
// }
// type SocketResponseData = {
//   [key: string]: string | number | boolean | object | null | undefined
// }
type SocketRequestData = Record<string, unknown>
type SocketResponseData = Record<string, unknown>

function useSocketRequest(socket: Socket) {
  const [isRequestInProgress, setIsRequestInProgress] = useState<boolean>(false)

  const sendRequest = async <TResponse extends SocketResponseData>(
    event: string,
    data: SocketRequestData,
    callback?: (response: TResponse) => void // Добавляем третий параметр для колбека
  ) => {
    if (isRequestInProgress) return
    setIsRequestInProgress(true)

    try {
      const response = await new Promise<TResponse>((resolve, reject) => {
        socket.emit(
          event,
          data,
          (serverResponse: TResponse & { error?: string }) => {
            if (serverResponse.error) {
              reject(serverResponse.error)
            } else {
              resolve(serverResponse)
            }
          }
        )
      })
      console.log("Ответ от сервера", response)
      if (callback) {
        callback(response)
      }
      return response
    } catch (error) {
      console.error("Ошибка при запросе", error)
    } finally {
      setIsRequestInProgress(false)
    }
  }
  return { sendRequest, isRequestInProgress }
}

export default useSocketRequest
