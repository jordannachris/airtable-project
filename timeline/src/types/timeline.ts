export interface TimelineItem {
  id: number;
  name: string;
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
  lane?: number;
}

export interface TimelineProps {
  items: TimelineItem[];
  onItemUpdate?: (item: TimelineItem) => void;
}
