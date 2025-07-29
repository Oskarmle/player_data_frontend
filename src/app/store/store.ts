import { configureStore } from "@reduxjs/toolkit";
import PlayerReducer from "../player/playerSlice";

export const store = configureStore({
  reducer: {
    player: PlayerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
