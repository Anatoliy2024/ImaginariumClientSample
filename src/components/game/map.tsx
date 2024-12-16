// import { getColor } from "@/function/getColor"
import { useAppSelector } from "@/store/hooks"
import clsx from "clsx"

import { BACKGROUND_COLOR } from "@/constant/color"
import Image from "next/image"
import { AssociationType } from "../svg/associationType/associationType"

export function Map() {
  const playersInfo = useAppSelector((state) => state.gameOption.playersInfo)
  if (!playersInfo) {
    return <div className="flex items-center justify-center">Загрузка</div>
  }
  return (
    <div className="flex-map 2xl:min-h-[600px] bg-slate-600/60 rounded-2xl p-3 ">
      <div className="flex flex-col gap-3">
        {playersInfo.map((player, index) => {
          console.log("player.name", player.name)
          console.log("player.points", player.points)
          const textColor = BACKGROUND_COLOR[player.color]
          return (
            <div
              style={{
                color: "#000",
                // textColor,
                background: player.color,
                fontWeight: 700,
              }}
              className={clsx(
                "flex justify-between items-center rounded-2xl  px-2"
                // player?.isPlayerActive ? "" : ""
              )}
              key={index}
            >
              <div className="min-w-[50px] ">
                {player.isPlayerActive && (
                  <AssociationType
                    colorText={textColor}
                    type={player.associationType}
                  />
                )}
                {/* <Crown
                  colorText={player?.isPlayerActive ? textColor : player.color}
                /> */}
              </div>

              <div className="flex justify-around items-center w-full">
                <div className="rounded-full overflow-hidden h-[50px] w-[50px]">
                  <Image
                    src={player.avatar as string}
                    alt="avatar"
                    width={50}
                    height={50}
                    // style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {player.name}
                </div>
                <div>{player.points}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
