// src/recipe/entities/recipe.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

export class Recipe {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  instructions: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty({ type: () => User })
  user?: User;

  @ApiProperty({ type: () => [Ingredient] })
  ingredients?: Ingredient[];
}
