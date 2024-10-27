import { IsArray, IsDefined, IsString, IsEnum } from 'class-validator';
import {
  SupportedLanguages,
  CustomerRatings,
  SupportedProducts,
} from '../constants';

const supportedLanguages = Object.values(SupportedLanguages);
const supportedProducts = Object.values(SupportedProducts);
const supportedRatings = Object.values(CustomerRatings);

export class CalendarQueryDto {
  @IsDefined()
  @IsString()
  readonly date: string;

  @IsDefined()
  @IsArray()
  @IsEnum(supportedProducts, {
    message: 'The product must be the one supported by the system.',
    each: true,
  })
  readonly products: string[];

  @IsDefined()
  @IsEnum(supportedLanguages, {
    message: 'The language must be the one supported by the system.',
  })
  readonly language: string;

  @IsDefined()
  @IsEnum(supportedRatings, {
    message: 'The rating value must be the one supported by the system.',
  })
  readonly rating: string;
}
