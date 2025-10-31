import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Recipes API')
    .setDescription('Recipes API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.setGlobalPrefix('api');
  app.getHttpAdapter().get('/api-json', (req, res) => {
    res.json(document);
  });

  await app.listen(3000);
  console.log(`Swagger available at http://localhost:3000/api`);
  console.log(`OpenAPI JSON available at http://localhost:3000/api-json`);
}
bootstrap();
