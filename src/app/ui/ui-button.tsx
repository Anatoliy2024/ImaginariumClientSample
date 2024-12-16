"use client"
import clsx from "clsx"
import { ReactNode } from "react"
type ButtonMenu = {
  children: ReactNode
  variant: string
  className?: string
  onClick?: (some: React.MouseEvent<HTMLElement>) => void
}

export function UiButton({
  children,
  className,
  onClick,
  variant,
}: ButtonMenu) {
  const buttonClassName = clsx(
    "flex justify-center items-center select-none cursor-pointer rounded-xl bg-emerald-200 hover:bg-emerald-400 active:bg-emerald-600 ",
    className,
    {
      menu: "min-w-80 py-2  mb-6  shadow-lg shadow-emerald-300 hover:shadow-emerald-400 ",
      auth: "min-w-32  px-2 py-[5px]",
      chat: "min-w-[60px] py-[5px]",
    }[variant]
  )

  return (
    <div
      className={buttonClassName}
      style={{ fontWeight: 700 }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
