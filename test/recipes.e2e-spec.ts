import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Recipes (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    // Create test user first (if needed)
    await request(app.getHttpServer())
      .post('/user') // or your user creation endpoint
      .send({ email: 'testuser@example.com', password: 'password123', name: 'Test User' })
      .expect(201);

    // Log in to get JWT token
    const authRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testuser@example.com', password: 'password123' })
      .expect(201);

    token = authRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/recipes (POST) → should create a recipe', async () => {
    const res = await request(app.getHttpServer())
      .post('/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Pizza', description: 'Delicious' })
      .expect(201);

    expect(res.body.title).toBe('Pizza');
  });

  it('/recipes (GET) → should return list of recipes', async () => {
    const res = await request(app.getHttpServer())
      .get('/recipes')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
  });
});
