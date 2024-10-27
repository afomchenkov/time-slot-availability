import { Slot } from '../entities';
import { TimeSlot } from './time-slot';

export type ManagerId = string;

export type TimeConfigByManager = {
  availableSlots: TimeSlot[];
  bookedSlots: TimeSlot[];
  filteredAvailableSlots: TimeSlot[];
};

export class AvailabilitiesBuilder extends Map<ManagerId, TimeConfigByManager> {
  /**
   * Group the time slots per manager, separate available and booked time slots
   *
   * @param slots Slot
   * @returns this
   */
  groupByManager(slots: Slot[]): AvailabilitiesBuilder {
    slots.forEach((slot) => {
      const { salesManagerId, startDate, endDate, booked } = slot;
      const timeSlot = new TimeSlot(startDate, endDate);

      // set up new record for a manager
      if (this.has(salesManagerId)) {
        const { bookedSlots, availableSlots } = this.get(salesManagerId);
        if (booked) {
          bookedSlots.push(timeSlot);
        } else {
          availableSlots.push(timeSlot);
        }
        return;
      }

      const timeSlotsConfig = {
        availableSlots: [],
        bookedSlots: [],
        filteredAvailableSlots: [],
      };

      // update records for a manager
      if (booked) {
        timeSlotsConfig.bookedSlots.push(timeSlot);
      } else {
        timeSlotsConfig.availableSlots.push(timeSlot);
      }
      this.set(salesManagerId, timeSlotsConfig);
    });

    return this;
  }

  /**
   * Filters booked dates intersection to get the dates which are still available
   *
   * @returns this
   */
  filterBookedIntersectionDates(): AvailabilitiesBuilder {
    for (const [managerId, timeSlotsConfig] of this.entries()) {
      const { availableSlots, bookedSlots } = timeSlotsConfig;

      if (bookedSlots.length) {
        const filteredAvailableSlots = availableSlots.filter((availableSlot) =>
          bookedSlots.some(
            (bookedSlot) => !bookedSlot.hasIntersection(availableSlot),
          ),
        );

        this.get(managerId).filteredAvailableSlots.push(
          ...filteredAvailableSlots,
        );
        continue;
      }

      // if nothing is booked, we can consider all availableSlots are 'good'
      this.get(managerId).filteredAvailableSlots.push(...availableSlots);
    }

    return this;
  }

  /**
   * Calculate response
   *
   * @returns [{ available_count: number, start_date: string }]
   */
  getDatesForResponse() {
    const resultMap = new Map<string, number>();

    for (const timeSlotsConfig of this.values()) {
      const { filteredAvailableSlots } = timeSlotsConfig;

      for (const slot of filteredAvailableSlots) {
        if (resultMap.has(slot.startDate)) {
          resultMap.set(slot.startDate, resultMap.get(slot.startDate) + 1);
        } else {
          resultMap.set(slot.startDate, 1);
        }
      }
    }

    // Important: clear the state of the builder before next calculation
    this.clear();

    return Array.from(resultMap.entries()).map(
      ([start_date, available_count]) => ({ start_date, available_count }),
    );
  }
}
