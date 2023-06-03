import { IsNumber } from 'class-validator';

export class GetTopExchangersDto {
  constructor() {
    this.limit = 3;
  }

  @IsNumber()
  limit: number;
}
