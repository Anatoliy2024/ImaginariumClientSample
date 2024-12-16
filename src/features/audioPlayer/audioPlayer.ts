import { createSlice } from "@reduxjs/toolkit"

export type AudioPlayer = {
  showAudioPlayer: boolean
  playMusic: boolean
  valueMusic: number
  indexMusic: number
}

const initialState: AudioPlayer = {
  showAudioPlayer: false,
  playMusic: false,
  valueMusic: 10,
  indexMusic: 0,
}

const playerOptionsSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    changeValues: (state, action) => {
      state.valueMusic = action.payload
    },
    changePlayMusic: (state, action) => {
      state.playMusic = !action.payload
    },
    changeIndexMusic: (state, action) => {
      state.indexMusic = action.payload
    },
    changeShowAudioPlayer: (state, action) => {
      console.log("action", action)
      state.showAudioPlayer = action.payload
    },
  },
})

export const {
  changeValues,
  changePlayMusic,
  changeIndexMusic,
  changeShowAudioPlayer,
} = playerOptionsSlice.actions

export default playerOptionsSlice.reducer
