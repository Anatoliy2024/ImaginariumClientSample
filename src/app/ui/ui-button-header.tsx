import { ReactNode } from "react"

export function UiButtonHeader({
  children,
  onClick,
  title,
}: {
  children: ReactNode
  title?: string
  onClick?: (some: React.MouseEvent<HTMLElement>) => void
}) {
  return (
    <div
      className="text-teal-400 hover:bg-emerald-800 rounded-xl cursor-pointer"
      onClick={onClick}
      title={title}
    >
      {children}
    </div>
  )
}
