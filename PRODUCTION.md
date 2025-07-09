# 🏥 Veterinaria Backend - NestJS

Backend API de la aplicación veterinaria construido con NestJS, Prisma y PostgreSQL.

## 🚀 Deploy a Producción

### Build de imagen Docker

```bash
# Construir imagen para producción
docker build -t veterinaria/backend:latest .

# Construir con tag específico
docker build -t veterinaria/backend:v1.0.0 .

# Push a registry
docker push veterinaria/backend:latest
```

### Variables de entorno requeridas

```bash
# Variables esenciales para producción
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-very-secure-jwt-secret
PORT=3000

# Opcionales
CORS_ORIGIN=https://your-frontend.com
LOG_LEVEL=info
```

### Ejecutar contenedor

```bash
# Ejecutar localmente
docker run -d \
  --name veterinaria-backend \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://postgres:password@db:5432/vetdb \
  -e JWT_SECRET=your-secure-secret \
  veterinaria/backend:latest

# Con variables de entorno desde la línea de comandos
docker run -d \
  --name veterinaria-backend \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgresql://user:password@host:5432/database \
  -e JWT_SECRET=your-secure-secret \
  veterinaria/backend:latest
```

## 🏗️ Dockerfile de Producción

### Características
- ✅ Multi-stage build optimizado
- ✅ Node.js Alpine para menor tamaño
- ✅ Prisma Client generation
- ✅ Health check integrado
- ✅ Non-root user para seguridad
- ✅ Optimización de cache layers

### Ejemplo de Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production=false
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
WORKDIR /app
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json
COPY --chown=nestjs:nodejs prisma ./prisma
USER nestjs
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 🗄️ Gestión de Base de Datos

### Migraciones en producción

```bash
# Ejecutar migraciones antes del deploy
docker run --rm \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  veterinaria/backend:latest \
  npx prisma migrate deploy

# Script de inicio con migraciones automáticas
docker run \
  -e DATABASE_URL=postgresql://user:pass@host:5432/db \
  -e RUN_MIGRATIONS=true \
  veterinaria/backend:latest
```

### Backup y restore

```bash
# Backup
docker exec postgres-container pg_dump -U postgres vetdb > backup.sql

# Restore
docker exec -i postgres-container psql -U postgres vetdb < backup.sql
```

## 📝 CI/CD Integration

### GitHub Actions

```yaml
name: Build and Deploy Backend

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx prisma generate
      - run: npm run test
      - run: npm run test:e2e

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and push Docker image
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker build -t veterinaria/backend:${{ github.sha }} .
          docker build -t veterinaria/backend:latest .
          docker push veterinaria/backend:${{ github.sha }}
          docker push veterinaria/backend:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          # Aquí tu lógica de deploy
          # kubectl, docker-compose, etc.
```

### GitLab CI

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  services:
    - postgres:16
  variables:
    POSTGRES_DB: test_db
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
    DATABASE_URL: postgresql://postgres:postgres@postgres:5432/test_db
  script:
    - npm ci
    - npx prisma generate
    - npx prisma migrate deploy
    - npm run test
    - npm run test:e2e

build:
  stage: build
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

deploy:
  stage: deploy
  script:
    - kubectl set image deployment/backend backend=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  only:
    - main
```

## 🚀 Despliegue

### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    image: veterinaria/backend:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/vetdb
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
    volumes:
      - uploads:/app/uploads

  db:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: vetdb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  postgres_data:
  uploads:
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: veterinaria-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: veterinaria-backend
  template:
    metadata:
      labels:
        app: veterinaria-backend
    spec:
      containers:
      - name: backend
        image: veterinaria/backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: jwt-secret
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 60
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

## 📊 Monitoreo y Observabilidad

### Health checks

```typescript
// src/health/health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}
```

### Logging

```typescript
// Configuración de logging para producción
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const app = await NestFactory.create(AppModule, {
  logger: WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
    ],
  }),
});
```

### Métricas

```bash
# Endpoint de métricas (si implementado)
curl http://localhost:3000/metrics

# Logs del contenedor
docker logs veterinaria-backend

# Estadísticas de recursos
docker stats veterinaria-backend
```

## 🔒 Seguridad

### Variables de entorno sensibles

```bash
# Usar secretos seguros
JWT_SECRET=$(openssl rand -base64 32)
DATABASE_PASSWORD=$(openssl rand -base64 32)

# En Kubernetes
kubectl create secret generic app-secret \
  --from-literal=jwt-secret=$JWT_SECRET \
  --from-literal=database-password=$DATABASE_PASSWORD
```

### Headers de seguridad

```typescript
// main.ts
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || false,
    credentials: true,
  });
  
  await app.listen(3000);
}
```

### Rate limiting

```typescript
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
  ],
})
export class AppModule {}
```

## 📦 Optimizaciones

### Tamaño de imagen

```bash
# Ver tamaño
docker images veterinaria/backend

# Analizar layers
docker history veterinaria/backend:latest

# Imagen típica: ~200-400MB
```

### Performance

- ✅ Connection pooling con Prisma
- ✅ Caching con Redis (opcional)
- ✅ Compression middleware
- ✅ Database indexing optimizado
- ✅ Lazy loading donde corresponda

### Escalabilidad

- ✅ Stateless design
- ✅ Database connection pooling
- ✅ Horizontal scaling ready
- ✅ Load balancer compatible
