import type { TimelineItem } from "../types/timeline";
export function assignLanes(
  items: TimelineItem[]
): Array<TimelineItem & { lane: number }>;
