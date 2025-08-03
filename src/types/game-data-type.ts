import { Game } from "@/types/game-type";

export type gameData = {
  player_id?: string;
  gameData: Game[];
  loading?: boolean;
  error?: boolean;
};
