import { Injectable, Logger } from '@nestjs/common';
import { parse } from 'date-fns';
import { CalendarQueryDto, AvailableSlotResponseDto } from '../dtos';
import { SlotService } from './slot.service';
import { SalesManagerService } from './sales-manager.service';
import { groupByManager } from '../utils';

const format = 'yyyy-MM-dd';

@Injectable()
export class AppService {
  private logger: Logger = new Logger(AppService.name);

  constructor(
    public readonly smService: SalesManagerService,
    public readonly slotService: SlotService,
  ) {}

  async getAvailableSlots(
    payload: CalendarQueryDto,
  ): Promise<AvailableSlotResponseDto[]> {
    const { date, products, language, rating } = payload;

    this.logger.debug(`Query payload: ${JSON.stringify(payload)}`);

    const startDate = parse(date, format, new Date());
    const endDate = new Date(startDate);
    // count the whole day provided by the date
    endDate.setDate(endDate.getDate() + 1);

    // slots filtered by language, rating, products and available for provided date
    const slotsForGivenDate = await this.slotService.findSlotsByDateRange({
      startDate,
      endDate,
      language,
      rating,
      products,
    });

    this.logger.debug(
      `Total available slots count: ${JSON.stringify(slotsForGivenDate.length)}`,
    );

    const slotsPerManager = groupByManager(slotsForGivenDate);
    console.log(slotsPerManager);

    return {
      slotsForGivenDate,
      count: slotsForGivenDate.length,
    } as any;
  }
}
