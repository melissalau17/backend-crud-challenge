import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngredientsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createIngredientDto: CreateIngredientDto, userId: number) {
    const recipe = await this.findRecipeOwner(createIngredientDto.recipeId);
    if (!recipe || recipe.userId !== userId) {
      throw new ForbiddenException(
        'You can only add ingredients to your own recipes',
      );
    }

    const { recipeId, ...data } = createIngredientDto;

    return this.prisma.ingredients.create({
      data: {
        ...data,
        recipe: { connect: { id: recipeId } },
      },
    });
  }

  async findAll(recipeId?: number) {
    return this.prisma.ingredients.findMany({
      where: recipeId ? { recipeId } : {},
    });
  }

  async findByRecipe(recipeId: number) {
    return this.prisma.ingredients.findMany({
      where: { recipeId },
    });
  }

  async findOne(id: number) {
    return this.prisma.ingredients.findUnique({
      where: { id },
    });
  }

  async findRecipeOwner(recipeId: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { id: true, userId: true },
    });
    return recipe; // returns { id, userId } or null
  }

  async update(
    id: number,
    updateIngredientDto: UpdateIngredientDto,
    userId: number,
  ) {
    const ingredient = await this.findOne(id);
    const recipe = await this.findRecipeOwner(ingredient.recipeId);
    if (recipe.userId !== userId) {
      throw new ForbiddenException(
        'You can only update ingredients for your own recipes',
      );
    }
    return this.prisma.ingredients.update({
      where: { id },
      data: updateIngredientDto,
    });
  }

  async remove(id: number, userId: number) {
    const ingredient = await this.findOne(id);
    const recipe = await this.findRecipeOwner(ingredient.recipeId);
    if (recipe.userId !== userId) {
      throw new ForbiddenException(
        'You can only delete ingredients for your own recipes',
      );
    }
    return this.prisma.ingredients.delete({
      where: { id },
    });
  }
}
