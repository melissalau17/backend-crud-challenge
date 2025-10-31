import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({ example: 'Spaghetti Bolognese' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'A classic Italian pasta dish' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Cook pasta, prepare sauce, mix together' })
  @IsString()
  instructions: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  userId: number;
}
