import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIngredientDto {
  @ApiProperty({ example: 'Tomato' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Vegetable' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: '200g' })
  @IsString()
  amount: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  recipeId: number;
}
