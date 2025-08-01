import { Game } from "../types/game-type";
export function calculateWonLost(games: Game[] | undefined) {
  if (!Array.isArray(games)) {
    return { won: 0, lost: 0 };
  }

  return games.reduce(
    (acc, game) => {
      if (game.gained_lost > 0) acc.won++;
      else if (game.gained_lost < 0) acc.lost++;
      return acc;
    },
    { won: 0, lost: 0 }
  );
}
