export interface Game {
  opponent_name?: string;
  gained_lost: number;
}

export type OpponentStats = {
  opponent_name: string;
  won: number;
  lost: number;
  ratingChange: number;
};

export function calculateOpponentStats(
  games: Game[] | undefined
): OpponentStats[] {
  if (!Array.isArray(games)) return [];

  const statsMap = new Map<string, OpponentStats>();

  games.forEach((game) => {
    if (!game.opponent_name) return;

    if (!statsMap.has(game.opponent_name)) {
      statsMap.set(game.opponent_name, {
        opponent_name: game.opponent_name,
        won: 0,
        lost: 0,
        ratingChange: 0,
      });
    }

    // Count wins/losses
    const opponent = statsMap.get(game.opponent_name)!;
    if (game.gained_lost > 0) opponent.won++;
    else if (game.gained_lost < 0) opponent.lost++;

    // Count rating changes
    opponent.ratingChange += game.gained_lost;
  });

  return Array.from(statsMap.values());
}
