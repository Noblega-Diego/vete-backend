import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Clients (e2e)', () => {
  let app: INestApplication;
  let clientId: number;
  const uniqueEmail = `juan_${Date.now()}@example.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /clients - crear cliente', async () => {
    const res = await request(app.getHttpServer())
      .post('/clients')
      .send({
        name: 'Juan Pérez',
        email: uniqueEmail,
        phone: '123456789',
        address: 'Calle Falsa 123',
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    clientId = res.body.id;
  });

  it('GET /clients - listar clientes', async () => {
    const res = await request(app.getHttpServer()).get('/clients');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it('GET /clients/:id - obtener cliente', async () => {
    const res = await request(app.getHttpServer()).get(`/clients/${clientId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', clientId);
  });

  it('PATCH /clients/:id - actualizar cliente', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/clients/${clientId}`)
      .send({ phone: '987654321' });
    expect(res.status).toBe(200);
    expect(res.body.phone).toBe('987654321');
  });

  it('DELETE /clients/:id - baja lógica', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/clients/${clientId}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });
});
