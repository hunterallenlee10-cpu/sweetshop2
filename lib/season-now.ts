import { cacheLife } from "next/cache";
import { seasonForMonth, type SeasonId } from "./catalog";

/**
 * The season in Carnegie right now. Cached (and so allowed to read the clock during prerender) and revalidated
 * hourly, so the homepage spotlight and the seasonal page flip on the first of the month without a redeploy.
 */
export async function currentSeasonId(): Promise<SeasonId> {
  "use cache";
  cacheLife("hours");
  const month = Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", month: "numeric" }).format(new Date()));
  return seasonForMonth(month);
}
