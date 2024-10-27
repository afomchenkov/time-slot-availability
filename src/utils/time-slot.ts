import { hasIntersection } from './helpers';

export class TimeSlot {
  startDate: string;
  endDate: string;

  constructor(start, end) {
    this.startDate = start.toISOString();
    this.endDate = end.toISOString();
  }

  hasIntersection(slotToCompare: TimeSlot): boolean {
    return hasIntersection(
      this.startDate,
      this.endDate,
      slotToCompare.startDate,
      slotToCompare.endDate,
    );
  }
}
