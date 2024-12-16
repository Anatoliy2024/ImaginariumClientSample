"use client"

import { Layout } from "../../components/layout/layout"
import { UiButton } from "../ui/ui-button"
import { useRouter } from "next/navigation"

export default function Menu() {
  const router = useRouter()
  return (
    <Layout className="flex-col relative ">
      <UiButton
        variant="menu"
        onClick={() => {
          router.push("/option-game")
        }}
      >
        Новая игра
      </UiButton>
      <UiButton
        variant="menu"
        onClick={() => {
          router.push("/search-game")
        }}
      >
        Поиск игры
      </UiButton>
      <UiButton variant="menu">Правила</UiButton>
      <UiButton variant="menu">Статистика</UiButton>
    </Layout>
  )
}
