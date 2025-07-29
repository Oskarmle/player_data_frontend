import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  player_id: string;
  player_link: string;
  firstName: string;
  lastName: string;
  Team: string;
}

const initialState: PlayerState = {
  player_id: "",
  player_link: "",
  firstName: "",
  lastName: "",
  Team: "",
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<PlayerState>) => {
      state.player_id = action.payload.player_id;
      state.player_link = action.payload.player_link;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.Team = action.payload.Team;
    },
    clearPlayer: (state) => {
      state.player_id = "";
      state.player_link = "";
      state.firstName = "";
      state.lastName = "";
      state.Team = "";
    },
  },
});

export const { setPlayer, clearPlayer } = playerSlice.actions;
export default playerSlice.reducer;
