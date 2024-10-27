import { IsString, IsNumber } from 'class-validator';

export class AvailableSlotResponseDto {
  @IsNumber()
  readonly available_count: number;

  @IsString()
  readonly start_date: string;
}
