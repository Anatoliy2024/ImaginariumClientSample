import { configureStore } from "@reduxjs/toolkit"
import playerOnlineReducer from "../features/playerOnline/playerOnlineSlice"
// import socketReducer from "../features/socket/socketSlice"
// import socketMiddleware from "../features/socket/socketMiddleware"
import gameOptionsReducer from "../features/gameOptions/gameOptions"
import playerOptionsReducer from "../features/playerOptions/playerOptionsSlice"
import lobbyPlayersReducer from "../features/lobbyPlayers/lobbyPlayers"
import audioPlayerReducer from "../features/audioPlayer/audioPlayer"
export const store = configureStore({
  reducer: {
    playersOnline: playerOnlineReducer,
    playerOptions: playerOptionsReducer,
    gameOption: gameOptionsReducer,
    lobbyPlayers: lobbyPlayersReducer,
    audioPlayer: audioPlayerReducer,
    // socket: socketReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(socketMiddleware), // Добавьте middleware сокета
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
