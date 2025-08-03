import { subMonths, parseISO, isAfter, format } from "date-fns";

export type GameData = {
  game_date: string;
  gained_lost?: number;
};

export function calculateGainedLostRating(
  gameData: GameData[]
): { month: string; ratingChange: number }[] {
  if (!Array.isArray(gameData)) return [];

  const now = new Date();
  const cutoff = subMonths(now, 12);
  const monthlyTotals: Record<string, number> = {};

  gameData.forEach((game) => {
    const gameDate = parseISO(game.game_date);
    if (!isAfter(gameDate, cutoff)) return;

    const key = format(gameDate, "yyyy-MM");
    monthlyTotals[key] = (monthlyTotals[key] || 0) + (game.gained_lost || 0);
  });

  // Convert to sorted array
  const result = Object.entries(monthlyTotals)
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([monthKey, total]) => ({
      month: format(new Date(monthKey + "-01"), "MMM yyyy"),
      ratingChange: total,
    }));
  return result;
}
