import { Slot } from '../entities';

export type TimeSlotByManager = {
  startDate: Date;
  endDate: Date;
  booked;
};

export const groupByManager = (slots: Slot[]) => {
  return slots.reduce((grouping, slot) => {
    const { salesManagerId, startDate, endDate, booked } = slot;

    const timeSlot: TimeSlotByManager = {
      startDate,
      endDate,
      booked,
    };

    if (grouping.has(salesManagerId)) {
      grouping.get(salesManagerId).push(timeSlot);
    } else {
      grouping.set(salesManagerId, [timeSlot]);
    }

    return grouping;
  }, new Map<string, TimeSlotByManager[]>());
};
