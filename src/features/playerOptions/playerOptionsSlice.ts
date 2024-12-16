import { createSlice } from "@reduxjs/toolkit"

export type PlayerOptionsType = {
  name: string | null
  avatar: string
  game: string | null
  token: string | null
}

const initialState: PlayerOptionsType = {
  name: null,
  avatar: "",
  game: null,
  token: null,
}

const playerOptionsSlice = createSlice({
  name: "playerOption",
  initialState,
  reducers: {
    changePlayer: (state, action) => {
      state.name = action.payload.name
      state.avatar = action.payload.avatar
      state.game = action.payload.game
      state.token = action.payload.token
    },
    logOutPlayer: (state) => {
      state.name = null
      state.avatar = ""
      state.game = null
      state.token = null
    },
  },
})

export const { changePlayer, logOutPlayer } = playerOptionsSlice.actions

export default playerOptionsSlice.reducer
