import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Recipes (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let recipeId: number;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    
    const authRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201);

    token = authRes.body.access_token;
    expect(token).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /recipes → should create a new recipe', async () => {
    const res = await request(app.getHttpServer())
      .post('/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Pancakes',
        description: 'Fluffy pancakes with syrup',
        instructions: 'Mix, cook, and serve',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Pancakes');
    recipeId = res.body.id;
  });

  it('GET /recipes → should return list of recipes', async () => {
    const res = await request(app.getHttpServer())
      .get('/recipes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /recipes/:id → should return a single recipe', async () => {
    const res = await request(app.getHttpServer())
      .get(`/recipes/${recipeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.id).toBe(recipeId);
    expect(res.body.title).toBe('Test Pancakes');
  });

  it('PATCH /recipes/:id → should update recipe', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/recipes/${recipeId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ description: 'Updated pancake description' })
      .expect(200);

    expect(res.body.description).toBe('Updated pancake description');
  });

  it('DELETE /recipes/:id → should delete recipe', async () => {
    await request(app.getHttpServer())
      .delete(`/recipes/${recipeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
