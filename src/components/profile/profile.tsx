import clsx from "clsx"
import Image from "next/image"

type ProfileType = {
  className?: string
  name: string
  avatar: string | null
}

export function Profile({ className, name, avatar }: ProfileType) {
  return (
    <div className={clsx("flex gap-4", className)}>
      <div className="rounded-full overflow-hidden">
        <Image
          src={avatar ? avatar : "/100Line.png"}
          width={50}
          height={50}
          alt="avatar"
        />
      </div>
      <div className="max-w-36 overflow-hidden text-ellipsis whitespace-nowrap max-md:hidden">
        {name}
      </div>
    </div>
  )
}
