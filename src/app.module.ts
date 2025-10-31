import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, RecipeModule, IngredientsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
