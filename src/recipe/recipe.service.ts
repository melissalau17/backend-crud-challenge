import { Body, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRecipeDto: CreateRecipeDto) {
    const { userId, ...data } = createRecipeDto;

    return this.prisma.recipe.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll() {
    return this.prisma.recipe.findMany();
  }

  findOne(id: number) {
    return this.prisma.recipe.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const { userId, ...data } = updateRecipeDto;

    return this.prisma.recipe.update({
      where: { id },
      data: {
        ...data,
        ...(userId && { user: { connect: { id: userId } } }),
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.recipe.delete({
      where: { id },
    });
  }
}
