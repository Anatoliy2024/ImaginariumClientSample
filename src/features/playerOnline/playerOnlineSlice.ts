import { createSlice } from "@reduxjs/toolkit"

interface CounterState {
  value: number
  playersList: string[]
}

const initialState: CounterState = {
  value: 0,
  playersList: [],
}

export const playerOnlineSlice = createSlice({
  name: "playerOnline",
  initialState,
  reducers: {
    getCountPlayer: (state, action) => {
      state.value = action.payload.length
      state.playersList = action.payload
    },
  },
})

export const { getCountPlayer } = playerOnlineSlice.actions

export default playerOnlineSlice.reducer
