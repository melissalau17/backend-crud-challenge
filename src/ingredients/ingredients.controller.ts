import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Ingredients')
@Controller('recipes/:recipeId/ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new ingredient to a recipe (JWT protected)' })
  async create(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() createIngredientDto: CreateIngredientDto,
    @Request() req,
  ) {
    const recipe = await this.ingredientsService.findRecipeOwner(recipeId);
    if (!recipe || recipe.userId !== req.user.userId) {
      throw new ForbiddenException(
        'You can only add ingredients to your own recipes',
      );
    }
    return this.ingredientsService.create({ ...createIngredientDto, recipeId }, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ingredients for a recipe' })
  findAll(@Param('recipeId', ParseIntPipe) recipeId: number) {
    return this.ingredientsService.findAll(recipeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific ingredient by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an ingredient (JWT protected)' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
    @Request() req,
  ) {
    const ingredient = await this.ingredientsService.findOne(id);
    const recipe = await this.ingredientsService.findRecipeOwner(ingredient.recipeId);
    if (!recipe || recipe.userId !== req.user.userId) {
      throw new ForbiddenException(
        'You can only update ingredients for your own recipes',
      );
    }
    return this.ingredientsService.update(id, updateIngredientDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ingredient (JWT protected)' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    const ingredient = await this.ingredientsService.findOne(id);
    const recipe = await this.ingredientsService.findRecipeOwner(ingredient.recipeId);
    if (!recipe || recipe.userId !== req.user.userId) {
      throw new ForbiddenException(
        'You can only delete ingredients for your own recipes',
      );
    }
    return this.ingredientsService.remove(id, req.user.userId);
  }
}
