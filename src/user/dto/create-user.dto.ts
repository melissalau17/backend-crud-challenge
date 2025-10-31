import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Alice' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'alice@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '1000' })
  @IsString()
  amount: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  password: string;
}
