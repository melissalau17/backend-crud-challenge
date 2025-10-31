import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Ingredients (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let recipeId: number;
  let ingredientId: number;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);

    await request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        amount: '0',
      });

    // Login to get JWT
    const authRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201);

    token = authRes.body.access_token;

    const recipeRes = await request(app.getHttpServer())
      .post('/recipe')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Pancakes',
        description: 'Fluffy pancakes',
        instructions: 'Mix, cook, and serve',
      })
      .expect(201);

    recipeId = recipeRes.body.id;
  });

  afterAll(async () => {
    await prisma.ingredients.deleteMany({});
    await prisma.recipe.deleteMany({});
    await prisma.user.deleteMany({});
    await app.close();
  });

  it('POST /recipes/:recipeId/ingredients → create ingredient', async () => {
    const res = await request(app.getHttpServer())
      .post(`/recipes/${recipeId}/ingredients`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Flour',
        amount: '200g',
        type: 'Dry',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Flour');
    ingredientId = res.body.id;
  });

  it('GET /recipes/:recipeId/ingredients → list ingredients', async () => {
    const res = await request(app.getHttpServer())
      .get(`/recipes/${recipeId}/ingredients`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /recipes/:recipeId/ingredients/:id → get single ingredient', async () => {
    const res = await request(app.getHttpServer())
      .get(`/recipes/${recipeId}/ingredients/${ingredientId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.id).toBe(ingredientId);
    expect(res.body.name).toBe('Flour');
  });

  it('PATCH /recipes/:recipeId/ingredients/:id → update ingredient', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/recipes/${recipeId}/ingredients/${ingredientId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: '250g' })
      .expect(200);

    expect(res.body.amount).toBe('250g');
  });

  it('DELETE /recipes/:recipeId/ingredients/:id → delete ingredient', async () => {
    await request(app.getHttpServer())
      .delete(`/recipes/${recipeId}/ingredients/${ingredientId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
