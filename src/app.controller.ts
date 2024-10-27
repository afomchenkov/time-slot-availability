import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  Logger,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './services/app.service';
import { CalendarQueryDto, AvailableSlotResponseDto } from './dtos';
import { HealthCheck } from '@nestjs/terminus';
import { HealthService } from './services';

@Controller()
export class AppController {
  private logger: Logger = new Logger(AppService.name);

  constructor(
    private readonly appService: AppService,
    private readonly healthService: HealthService,
  ) {}

  @Get('/healthcheck')
  @HealthCheck()
  healthcheck(): object {
    return this.healthService.checkTerminus();
  }

  @Post('/calendar/query')
  @HttpCode(200)
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
