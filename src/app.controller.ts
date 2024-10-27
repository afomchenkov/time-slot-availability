import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AppService } from './services/app.service';
import { CalendarQueryDto, AvailableSlotResponseDto } from './dtos';

@Controller()
export class AppController {
  private logger: Logger = new Logger(AppService.name);

  constructor(private readonly appService: AppService) {}

  @Post('/calendar/query')
  async getCalendar(
    @Body() payload: CalendarQueryDto,
  ): Promise<AvailableSlotResponseDto[]> {
    try {
      return await this.appService.getAvailableSlots(payload);
    } catch (error) {
      this.logger.error(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }
}
