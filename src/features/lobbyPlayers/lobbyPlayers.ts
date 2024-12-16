import { createSlice } from "@reduxjs/toolkit"

export type LobbyPlayersType = {
  nameGame: string
  type: string
  pack: string
  timer: string
  lobby: string
  players: playerInfoInLobby[]
  playerChat: []
}
export type playerInfoInLobby = {
  name: string
  avatar: string
  createPlayer: null | boolean
  socket: string
}

const initialState: LobbyPlayersType = {
  nameGame: "",
  type: "",
  pack: "",
  timer: "",
  lobby: "",
  players: [],
  playerChat: [],
}

const lobbyPlayersSlice = createSlice({
  name: "lobbyPlayers",
  initialState,
  reducers: {
    createLobbyReduce: (state, actions) => {
      const data = actions.payload.game
      state.nameGame = data.nameGame
      state.type = data.type
      state.pack = data.pack
      state.timer = data.timer
      state.lobby = data.lobby
      state.players = data.players
      state.playerChat = data.playerChat

      // console.log(actions)
    },
    changeChatInLobby: (state, actions) => {
      const data = actions.payload
      console.log("data", data)
      state.playerChat = data.playerChat
    },
    closeLobbyReducer: (state) => {
      state.nameGame = ""
      state.type = ""
      state.pack = ""
      state.timer = ""
      state.lobby = ""
      state.players = []
      state.playerChat = []
    },
    // changeLobbyReducer: (state, actions) => {
    //   const data = actions.payload
    //   console.log("data", data)
    //   state.players = data
    // },
  },
})

export const { createLobbyReduce, changeChatInLobby, closeLobbyReducer } =
  lobbyPlayersSlice.actions

export default lobbyPlayersSlice.reducer
