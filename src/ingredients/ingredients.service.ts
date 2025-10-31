import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createIngredientDto: CreateIngredientDto) {
    return this.prisma.ingredient.create({
      data: createIngredientDto,
    });
  }

  findAll(recipeId: number) {
    return this.prisma.ingredient.findMany({
      where: { recipeId },
    });
  }

  findOne(recipeId: number) {
    return this.prisma.ingredient.findUnique({
      where: { recipeId },
    });
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return this.prisma.ingredient.update({
      where: { id },
      data: updateIngredientDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.ingredient.delete({
      where: { id },
    });
  }
}
