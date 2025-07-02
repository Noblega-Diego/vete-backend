import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let email: string;
  let password: string;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    email = `testuser_${Date.now()}@example.com`;
    password = 'TestPassword123';
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register - registro de usuario', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email,
        password,
        name: 'Test User',
        role: 'CLIENT',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('access_token');
    token = res.body.access_token;
  });

  it('POST /auth/login - login de usuario', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('access_token');
    token = res.body.access_token;
  });

  it('POST /auth/me - obtener usuario autenticado', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', email);
  });
});
