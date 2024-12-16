"use client"
import { ReactNode } from "react"
import { Header } from "../header/header"
import clsx from "clsx"

type LayoutType = {
  children: ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutType) {
  return (
    <div className="min-h-screen flex">
      <Header />
      <div
        className={clsx(
          "mt-[65px] flex justify-center items-center w-screen",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
