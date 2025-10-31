import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'Alice Updated' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'newpassword123' })
  @IsOptional()
  @IsString()
  password?: string;
}
