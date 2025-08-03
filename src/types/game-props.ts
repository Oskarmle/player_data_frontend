import { Game } from "./game-type";
import { Player } from "./player-type";

export type PageData = {
  player_id?: string;
  gameData: Game[];
  games?: Game[];
  playerData?: Player;
  loading?: boolean;
  error?: {
    message: string;
  };
};
