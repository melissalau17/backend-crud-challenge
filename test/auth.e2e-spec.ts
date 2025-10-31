import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) should return JWT token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testuser@example.com', password: 'password123' })
      .expect(201);

    expect(res.body.access_token).toBeDefined();
  });
});
