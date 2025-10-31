import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Must include AuthModule
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const userService = app.get(UserService);
    await userService.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: await bcrypt.hash('password123', 10),
    });
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
