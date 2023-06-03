import { IsNumber, IsString } from 'class-validator';

export class TopExchanger {
  @IsNumber()
  id: number;

  @IsString()
  exchanger: string;

  @IsString()
  country: string;

  @IsNumber()
  profit: number;
}
