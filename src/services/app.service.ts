import { Injectable, Logger } from '@nestjs/common';
import { parse } from 'date-fns';
import { CalendarQueryDto, AvailableSlotResponseDto } from '../dtos';
import { SlotService } from './slot.service';
import { SalesManagerService } from './sales-manager.service';
import { AvailabilitiesBuilder } from '../utils/availabilities-builder';

const format = 'yyyy-MM-dd';

@Injectable()
export class AppService {
  private logger: Logger = new Logger(AppService.name);
  private availabilitiesBuilder: AvailabilitiesBuilder = null;

  constructor(
    public readonly smService: SalesManagerService,
    public readonly slotService: SlotService,
  ) {
    this.availabilitiesBuilder = new AvailabilitiesBuilder();
  }

  async getAvailableSlots(
    payload: CalendarQueryDto,
  ): Promise<AvailableSlotResponseDto[]> {
    const { date, products, language, rating } = payload;

    this.logger.debug(`Query payload: ${JSON.stringify(payload)}`);

    const startDate = parse(date, format, new Date());
    const endDate = new Date(startDate);
    // take into account the whole day provided by the payload start date
    endDate.setDate(endDate.getDate() + 1);

    // slots filtered by language, rating, products and available for provided date
    const dateSlotsForGivenDate = await this.slotService.findSlotsByDateRange({
      startDate,
      endDate,
      language,
      rating,
      products,
    });

    this.logger.debug(
      `Total slots count: ${JSON.stringify(dateSlotsForGivenDate.length)}`,
    );

    const dates = this.availabilitiesBuilder
      .groupByManager(dateSlotsForGivenDate)
      .filterBookedIntersectionDates()
      .getDatesForResponse();

    this.logger.debug(
      `Total available slots count: ${JSON.stringify(dates.length)}`,
    );

    return dates;
  }
}
