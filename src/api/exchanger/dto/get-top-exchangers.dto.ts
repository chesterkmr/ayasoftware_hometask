import { IsNumber } from 'class-validator';

export class GetTopExchangersDto {
  @IsNumber()
  limit: number;
}
