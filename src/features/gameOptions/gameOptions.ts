import { createSlice } from "@reduxjs/toolkit"

export type GameOptionsType = {
  gameId: string | null
  pack: PackCardType[] | null
  trash: PackCardType[] | null
  playersInfo: PlayerType[] | null
  statusGame: string | null
  guessCardPlayers: Record<string, PackCardType>
  pickCardPlayers: []
  option: OptionType | null
  playerChat: []
  round: number | null
}
type OptionType = { deck: string; type: string; time: string }
export type PackCardType = {
  id: number
  src: string
  shirt: string
}
export type PlayerType = {
  name: null | string
  avatar: null | string
  isPlayerActive: boolean
  playerDeck: []
  clickCard: PackCardType
  chooseCard: PackCardType
  color: string
  points: number
  createPlayer: boolean
  associationType: string
}

// const GameData = {
//     gameId: null,
//     pack: [],
//     trash: [],
//     playersInfo: [],
//     statusGame: "hostChoosesACard", //"playersChooseACard","showResult"
//     options: { deck: "classic", type: "classic" }, //"withCardList"
//     playerChat: [],
//   }

//   const playerInfo = {
//     name: null,
//     avatar: null,
//     isActive: false,
//     playerDeck: [],
//     points: 0,
//   }

//   const card = { id: 1, src: "/classic/1.png" }
// const optionGame = { deck: "classic", type: "classic", time: "one" }
const initialState: GameOptionsType = {
  gameId: null,
  pack: null,
  trash: null,
  playersInfo: null,
  statusGame: null,
  guessCardPlayers: {},
  pickCardPlayers: [],
  option: null,
  playerChat: [],
  round: null,
}

const gameOptionsSlice = createSlice({
  name: "gameOption",
  initialState,
  reducers: {
    createGameReducer: (state, actions) => {
      const data = actions.payload
      console.log("data", data)
      state.gameId = data.gameId
      state.pack = data.pack
      state.playersInfo = data.playersInfo
      state.statusGame = data.statusGame
      state.option = data.option
      state.playerChat = data.playerChat
      state.guessCardPlayers = data.guessCardPlayers
      state.pickCardPlayers = data.pickCardPlayers
      state.round = data.round
    },
    changeChatInGame: (state, actions) => {
      const data = actions.payload
      console.log("data", data)
      state.playerChat = data.playerChat
    },
    clickCardPlayer: (state, actions) => {
      const { userIndex, card } = actions.payload
      console.log("actions.payload", actions.payload)
      console.log("userIndex", userIndex)
      console.log("card", card)
      // Проверяем, что playersInfo существует и индекс корректен
      if (state.playersInfo && state.playersInfo[userIndex]) {
        state.playersInfo[userIndex].clickCard = card
      } else {
        console.error("Некорректный индекс или playersInfo не существует")
      }
    },
    chooseHostCard: (state, actions) => {
      const data = actions.payload
      state.statusGame = data.statusGame
      state.pickCardPlayers = data.pickCardPlayers
    },
    choosePlayerCard: (state, actions) => {
      const data = actions.payload
      state.statusGame = data.statusGame
      state.pickCardPlayers = data.pickCardPlayers
      if (data.playersInfo) {
        state.playersInfo = data.playersInfo
      }
    },
    guessPlayerCard: (state, actions) => {
      const data = actions.payload
      state.statusGame = data.statusGame
      state.guessCardPlayers = data.guessCardPlayers
      if (data.playersInfo) {
        state.playersInfo = data.playersInfo
      }
    },
    showResultReduce: (state, actions) => {
      const data = actions.payload
      state.statusGame = data.statusGame
      state.guessCardPlayers = data.guessCardPlayers
      state.playersInfo = data.playersInfo
    },
    nextRoundStartReduce: (state, actions) => {
      const data = actions.payload
      state.statusGame = data.statusGame
      state.guessCardPlayers = data.guessCardPlayers
      state.pickCardPlayers = data.pickCardPlayers
      state.playersInfo = data.playersInfo
      state.pack = data.pack
      state.round = data.round
    },
    playerLeave: (state, actions) => {
      console.log("actions**************", actions)
      const { data } = actions.payload
      console.log("data***************", data)

      state.gameId = data.gameId
      state.pack = data.pack
      state.playersInfo = data.playersInfo
      state.statusGame = data.statusGame
      state.option = data.option
      state.playerChat = data.playerChat
      state.guessCardPlayers = data.guessCardPlayers
      state.pickCardPlayers = data.pickCardPlayers
      state.round = data.round
    },
    removeGameOption: (state) => {
      console.log("Произошёл сброс игры")
      state.gameId = null
      state.pack = null
      state.trash = null
      state.playersInfo = null
      state.statusGame = null
      state.guessCardPlayers = {}

      state.pickCardPlayers = []
      state.option = null
      state.playerChat = []
      state.round = null
    },
  },
})

export const {
  createGameReducer,
  clickCardPlayer,
  chooseHostCard,
  choosePlayerCard,
  guessPlayerCard,
  showResultReduce,
  nextRoundStartReduce,
  removeGameOption,
  playerLeave,
  changeChatInGame,
} = gameOptionsSlice.actions

export default gameOptionsSlice.reducer
