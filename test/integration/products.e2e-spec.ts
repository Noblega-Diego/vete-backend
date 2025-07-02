import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Products (e2e)', () => {
  let app: INestApplication;
  let categoryId: number;
  let productId: number;
  const uniqueCategory = `Alimentos_${Date.now()}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    // Crear una categoría de ejemplo única antes de los tests
    const res = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: uniqueCategory });
    categoryId = res.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /products - crear producto', async () => {
    const res = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Croquetas Premium',
        price: 1000,
        stock: 50,
        categoryId: categoryId,
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    productId = res.body.id;
  });

  it('GET /products - listar productos', async () => {
    const res = await request(app.getHttpServer()).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it('GET /products/:id - obtener producto', async () => {
    const res = await request(app.getHttpServer()).get(`/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', productId);
  });

  it('PATCH /products/:id - actualizar producto', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/products/${productId}`)
      .send({ price: 1200 });
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(1200);
  });

  it('DELETE /products/:id - baja lógica', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });
});
