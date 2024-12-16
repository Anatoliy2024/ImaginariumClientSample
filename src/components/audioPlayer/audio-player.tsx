import { PrevSKip } from "./svg/prev-skip"
import { NextSKip } from "./svg/next-skip"

import { PlayerOn } from "./svg/playerOn"
import { useEffect, useRef } from "react"
import {
  changeValues,
  changePlayMusic,
  changeIndexMusic,
  changeShowAudioPlayer,
} from "@/features/audioPlayer/audioPlayer"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clsx } from "clsx"
import { MUSIC_LIST } from "./const"

type AudioPlayer = {
  playerOn: boolean
  playerActive: boolean
  value: number
  musicIndex: number
}

export function AudioPlayer() {
  const music = useRef<HTMLAudioElement | null>(null)

  const dispatch = useAppDispatch()
  const { showAudioPlayer, playMusic, valueMusic, indexMusic } = useAppSelector(
    (state) => state.audioPlayer
  )
  useEffect(() => {
    if (!music.current) {
      console.log("Музыка не найдена", music.current)
      // Инициализация объекта Audio только если он еще не был создан
      music.current = new Audio(`${MUSIC_LIST[indexMusic].src}`)
      music.current.volume = valueMusic / 100 // Установить громкость
      music.current.loop = true // Зациклить аудио
    }

    if (music.current.src !== MUSIC_LIST[indexMusic].src) {
      music.current.src = MUSIC_LIST[indexMusic].src
    }

    if (playMusic) {
      music.current.play().catch((error) => {
        console.error("Ошибка воспроизведения:", error)
      })
    } else {
      music.current.pause()
    }
  }, [playMusic, indexMusic])

  useEffect(() => {
    if (music.current) {
      music.current.volume = valueMusic / 100 // Установить громкость
    }
  }, [valueMusic])

  const nextTrack = () => {
    // console.log("next skip")
    const index = (indexMusic + 1) % MUSIC_LIST.length
    console.log("index", index)
    dispatch(changeIndexMusic(index))
  }

  // Переход к предыдущему треку
  const prevTrack = () => {
    const index = (indexMusic - 1 + MUSIC_LIST.length) % MUSIC_LIST.length
    console.log("index", index)
    dispatch(changeIndexMusic(index))
  }

  return (
    <div
      className={clsx(
        "absolute top-0 left-0 flex justify-center items-center min-h-screen min-w-full z-50 bg-slate-700/50",
        !showAudioPlayer ? "hidden" : ""
      )}
      onClick={() => {
        dispatch(changeShowAudioPlayer(false))
      }}
    >
      {/* <div className="group-hover:hidden">
        <PlayerOn />
      </div> */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex bg-slate-900/95 w-[360px] h-96 flex-col items-center text-white rounded-2xl p-2 select-none"
      >
        <div
          onClick={() => dispatch(changeShowAudioPlayer(false))}
          className="absolute min-w-[67px] min-h-[67px] top-2 right-2 cursor-pointer hover:bg-slate-300 rounded-full text-center "
        >
          &#x2716;
        </div>
        <h2>Музыка</h2>
        <div className="min-w-[80%]  flex justify-center items-center">
          <div className="min-w-[90%] min-h-[90%] text-9xl text-center">
            &#x266B;
          </div>
        </div>
        <div className="max-w-[80%]  mt-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {MUSIC_LIST[indexMusic].name}
        </div>
        <div className="flex mt-4 gap-3 cur">
          <div
            onClick={() => prevTrack()}
            className="hover:bg-slate-500 rounded-full cursor-pointer"
          >
            <PrevSKip />
          </div>
          <div
            className={clsx(
              "hover:bg-slate-500 rounded-full cursor-pointer",
              playMusic ? "bg-slate-500" : ""
            )}
            onClick={() => {
              console.log("changePlayMusic", changePlayMusic)
              dispatch(changePlayMusic(playMusic))
            }}
          >
            <PlayerOn />
          </div>

          <div
            onClick={() => nextTrack()}
            className="hover:bg-slate-500 rounded-full cursor-pointer"
          >
            <NextSKip />
          </div>

          <input
            className="w-20 cursor-pointer text-center p-0 m-0"
            type="range"
            min="0"
            max="50"
            value={valueMusic}
            onChange={(e) => {
              dispatch(changeValues(+e.target.value))
              // setAudioPlayer((prev) => ({ ...prev, value: +e.target.value }))
            }}
          />
        </div>
      </div>
    </div>
  )
}

// import { PrevSKip } from "./svg/prev-skip"
// import { NextSKip } from "./svg/next-skip"
// // import { Pause } from "./svg/pause"
// // import { PauseActive } from "./svg/pauseActive"
// // import { Play } from "./svg/play"
// // import { PlayActive } from "./svg/playActive"
// import { PlayerOn } from "./svg/playerOn"
// import { useEffect, useRef, useState } from "react"

// type AudioPlayer = {
//     playerOn: boolean
//   playerActive: boolean
//   value: number
//   musicIndex: number
// }

// const MUSIC_LIST = [
//   "/audio/little%20red%20riding%20hood.mp3",
//   "/audio/Alien%20Shooter.mp3",
//   "/audio/Her%20Theme%20(Drowned).mp3",
//   "/audio/The%20Broken.mp3",
//   "/audio/The%20Bulwark.mp3",
//   "/audio/The%20Hunter.mp3",
//   "/audio/The%20Path%20to%20the%20Door.mp3",
//   "/audio/The%20Twinned%20Town.mp3",
// ]
// export function AudioPlayer() {
//   const music = useRef<HTMLAudioElement | null>(null)
//   //   const savedState = JSON.parse(
//   //     localStorage.getItem("audioPlayerState") || "{}"
//   //   )
//   // const [audioPlayer, setAudioPlayer] = useState<AudioPlayer>({
//   //   playerOn: false,
//   //   playerActive: false,
//   //   value: 10,
//   //   musicIndex: 0,
//   // })

//   useEffect(() => {
//     if (!music.current) {
//       console.log("Музыка не найдена", music.current)
//       // Инициализация объекта Audio только если он еще не был создан
//       music.current = new Audio(`${MUSIC_LIST[audioPlayer.musicIndex]}`)
//     }
//     music.current.volume = audioPlayer.value / 100 // Установить громкость
//     music.current.loop = true // Зациклить аудио

//     // Установка источника для музыки, если индекс трека изменился
//     if (music.current.src !== MUSIC_LIST[audioPlayer.musicIndex]) {
//       music.current.src = MUSIC_LIST[audioPlayer.musicIndex]
//     }

//     // Проигрывание музыки
//     if (audioPlayer.playerActive) {
//       music.current.play().catch((error) => {
//         console.error("Ошибка воспроизведения:", error)
//       })
//     } else {
//       music.current.pause()
//     }

//     return () => {
//       // Очистка, если необходимо
//       // music.current?.pause()
//     }
//   }, [audioPlayer.musicIndex, audioPlayer.playerActive])

//   //   const playAudio = () => {
//   //     music.current.play().catch((error) => {
//   //       console.error("Ошибка воспроизведения:", error)
//   //     })
//   //     // setAudioPlayer((prev) => ({ ...prev, playerActive: true }))
//   //   }
//   //   const pauseAudio = () => {
//   //     music.current.pause()
//   //     // setAudioPlayer((prev) => ({ ...prev, playerActive: false }))
//   //   }
//   const nextTrack = () => {
//     // console.log("next skip")

//     setAudioPlayer((prev) => ({
//       ...prev,
//       musicIndex: (prev.musicIndex + 1) % MUSIC_LIST.length,
//     }))
//     // console.log("audioPlayer.musicIndex", audioPlayer.musicIndex)
//   }

//   // Переход к предыдущему треку
//   const prevTrack = () => {
//     setAudioPlayer((prev) => ({
//       ...prev,
//       musicIndex: (prev.musicIndex - 1 + MUSIC_LIST.length) % MUSIC_LIST.length,
//     }))
//     // console.log("audioPlayer.musicIndex", audioPlayer.musicIndex)
//   }

//   //   useEffect(() => {
//   //     console.log("Изменение трека")
//   //     console.log("playerActive", audioPlayer.playerActive)
//   //     if (audioPlayer.playerActive) {
//   //       console.log("audioPlayer.musicIndex", audioPlayer.musicIndex)
//   //       pauseAudio()
//   //       music.current.src = MUSIC_LIST[audioPlayer.musicIndex]
//   //       playAudio()
//   //     } else {
//   //       music.current.src = MUSIC_LIST[audioPlayer.musicIndex]
//   //     }
//   //   }, [audioPlayer.musicIndex])

//   //   useEffect(() => {
//   //     localStorage.setItem("audioPlayerState", JSON.stringify(audioPlayer))

//   //   }, [audioPlayer])

//   return (
//     <div className="flex group  ">
//       {/* <div className="group-hover:hidden">
//         <PlayerOn />
//       </div> */}

//       <div className="relative hidden group-hover:flex">
//         <div
//           onClick={() => prevTrack()}
//           className="hover:bg-slate-500 rounded-full"
//         >
//           <PrevSKip />
//         </div>

//         <div
//           className="hover:bg-slate-500 rounded-full"
//           onClick={() => {
//             console.log("audioPlayer.playerActive", audioPlayer.playerActive)

//             if (!audioPlayer.playerActive) {
//               //   playAudio()
//               setAudioPlayer((prev) => ({
//                 ...prev,
//                 playerActive: true,
//               }))
//             } else {
//               //   pauseAudio()
//               setAudioPlayer((prev) => ({
//                 ...prev,
//                 playerActive: false,
//               }))
//             }
//           }}
//         >
//           <PlayerOn />
//         </div>

//         <div
//           onClick={() => nextTrack()}
//           className="hover:bg-slate-500 rounded-full"
//         >
//           <NextSKip />
//         </div>

//         <input
//           className="w-20"
//           type="range"
//           min="0"
//           max="100"
//           value={audioPlayer.value}
//           onChange={(e) => {
//             setAudioPlayer((prev) => ({ ...prev, value: +e.target.value }))
//           }}
//         />
//       </div>
//     </div>
//   )
// }
