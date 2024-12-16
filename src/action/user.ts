import axios from "axios"
import { useRouter } from "next/navigation"
import { API_URL } from "../components/config"
import { getSocket } from "../socket/socket"

type RouterType = ReturnType<typeof useRouter>

axios.defaults.baseURL = API_URL
axios.defaults.withCredentials = true

export const registration = async (
  name: string | number,
  password: number | string,
  router: RouterType
): Promise<void> => {
  try {
    const response = await axios.post("/auth/registration", { name, password })
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("name", response.data.user.name)

    localStorage.setItem("avatar", response.data.user.avatar)
    const socket = getSocket()
    socket.emit("playerOnline", name, () => {})
    router.push("/menu")
    console.log(response.data.message)
  } catch (e) {
    alert(
      "Произошла ошибка. Проверьте пароль, он должен содержать от 3 до 12 символов, либо игрок с таким именем уже существует"
    )
    console.log(e)
    console.log("Error registration")
  }
}

export const login = async (
  name: string | number,
  password: string | number,
  router: RouterType
): Promise<void> => {
  try {
    const response = await axios.post("/auth/login", { name, password })

    localStorage.setItem("token", response.data.token)
    localStorage.setItem("name", response.data.user.name)

    localStorage.setItem("avatar", response.data.user.avatar)
    router.push("/menu")
    const socket = getSocket()
    socket.emit("playerOnline", name, () => {})
    return response.data
  } catch (e) {
    alert("Произошла ошибка, проверьте правильность введенных данных")
    console.log(e)
  }
}

export const auth = async () => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      return
    }
    const response = await axios.get("/auth/auth", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const uploadAvatar = async (file: File) => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      return
    }
    console.log("Файл в функции", file)
    console.log(file instanceof File)
    const formData = new FormData()
    formData.append("file", file)
    console.log("FormData после добавления файла", formData)
    console.log("Содержимое 'file' в FormData", formData.get("file"))

    const response = await axios.post(`/files/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })

    localStorage.setItem("avatar", response.data.avatar)
  } catch (e) {
    console.log("Ошибка при отправке", e)
  }
}
export const deleteAvatar = async () => {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      return
    }

    const response = await axios.delete(`/files/avatar`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    // console.log(response.data)

    localStorage.setItem("avatar", response.data.avatar)
  } catch (e) {
    console.log(e)
  }
}
