import { IsString, IsOptional } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsString()
  amount: string;
}