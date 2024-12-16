"use client"
import { Layout } from "@/components/layout/layout"
import { useState } from "react"
import { UiButton } from "../ui/ui-button"
import { useRouter } from "next/navigation"
import { login } from "../../action/user"
import { Loading } from "@/components/svg/loading"

export default function Registration() {
  const [user, setUser] = useState({ name: "", password: "" })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Layout>
      <div className="min-w-[400px] min-h-[400px] bg-gray-800/70 flex flex-col justify-center items-center gap-3 py-6 rounded-xl">
        <div className="text-slate-50">Авторизация</div>
        <div className=" flex flex-col items-center">
          <label htmlFor="log">Псевдоним</label>
          <input
            type="text"
            id="log"
            value={user.name}
            onChange={(event) =>
              setUser((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        </div>
        <div className=" flex flex-col items-center">
          <label htmlFor="pass">Пароль</label>
          <input
            type="password"
            id="pass"
            value={user.password}
            onChange={(event) =>
              setUser((prev) => ({ ...prev, password: event.target.value }))
            }
          />
        </div>
        <div className="flex gap-5">
          {!isLoading && (
            <UiButton
              variant="auth"
              onClick={async () => {
                setIsLoading(true)
                try {
                  await login(user.name, user.password, router)
                  setIsLoading(false)
                } catch (e) {
                  console.log(e)
                  setIsLoading(false)
                }
              }}
            >
              Отправить
            </UiButton>
          )}
          {isLoading && (
            <UiButton variant="auth">
              <Loading />
            </UiButton>
          )}

          <UiButton
            variant="auth"
            onClick={(e) => {
              e.preventDefault()
              router.push("/")
            }}
          >
            Отмена
          </UiButton>
        </div>
      </div>
    </Layout>
  )
}
