"use client"
import { deleteAvatar, uploadAvatar } from "../../action/user"
import { Layout } from "../../components/layout/layout"
import { UiButton } from "../ui/ui-button"
import { useRouter } from "next/navigation"
import { ChangeEvent } from "react"

export default function OptionPlayer() {
  const router = useRouter()
  // const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatar") || '')
  async function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files) {
        const file = e.target.files[0]
        console.log(file)
        await uploadAvatar(file)
        // window.location.reload()
        router.push("/menu")

        // Успешная загрузка аватара
        // Обновляем состояние, если это необходимо
      }
    } catch (error) {
      console.error("Ошибка при загрузке аватара:", error)
      // Обработка ошибки загрузки аватара
    }
  }

  async function handleDeleteAvatar() {
    try {
      await deleteAvatar()
      router.push("/menu")
      // Успешное удаление аватара
      // Обновляем состояние, если это необходимо
    } catch (error) {
      console.error("Ошибка при удалении аватара:", error)
      // Обработка ошибки удаления аватара
    }
  }

  return (
    <Layout className="flex flex-col gap-8 py-10 text ">
      <div className="flex flex-col justify-center items-center gap-10">
        <input
          type="file"
          placeholder="Загрузить аватар"
          onChange={changeHandler}
          accept="image/*"
        />
        <UiButton onClick={handleDeleteAvatar} variant="menu">
          Удалить аватар
        </UiButton>

        <UiButton
          variant="menu"
          onClick={(e) => {
            e.preventDefault()
            router.push("/menu")
          }}
        >
          В главное меню
        </UiButton>
      </div>
    </Layout>
  )
}
