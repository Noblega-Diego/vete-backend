<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

Este proyecto es un backend profesional para una veterinaria, basado en NestJS y Prisma. Sigue buenas prácticas, estructura modular, autenticación JWT, roles, validaciones, manejo de archivos, seeds, pruebas y despliegue en Docker. Genera código siguiendo la estructura y convenciones de la comunidad NestJS.

Quiero que generes el código base para un backend de una veterinaria utilizando NestJS y Prisma como ORM, empleando el siguiente esquema Prisma (ver más abajo).

El sistema debe cumplir con los siguientes requisitos y recomendaciones profesionales:

1. **Gestión de productos de petshop**: CRUD completo de productos, incluyendo nombre, descripción, precio, stock, categoría y manejo de imágenes.
2. **Gestión de clientes**: CRUD completo de clientes (nombre, email, teléfono, dirección).
3. **Gestión de mascotas por cliente**: Cada cliente puede tener varias mascotas. Cada mascota debe tener nombre, especie, raza, edad, peso e imágenes.
4. **Historial médico de las mascotas**: Cada mascota puede tener múltiples fichas médicas, cada ficha puede tener archivos adjuntos y estar asociada opcionalmente a una cita (appointment).
5. **Gestión de citas**: CRUD de citas, cada una asociada a un cliente, mascota y tipo de servicio.
6. **Gestión de servicios**: Catálogo de tipos de servicio, con nombre, descripción y duración.
7. **Sistema de cupones**: CRUD de cupones de descuento.
8. **Relaciones estrictas**: Las relaciones deben modelarse exactamente usando el siguiente esquema Prisma.
9. **Baja lógica**: Todas las entidades principales deben tener baja lógica (campo `deleted`).
10. **Estructura modular**: Incluye módulos, controladores y servicios para cada recurso siguiendo las mejores prácticas de NestJS.
11. **Endpoints REST**: Incluye ejemplos de endpoints REST (GET, POST, PUT/PATCH, DELETE) para cada recurso.
12. **Seguridad**: Protege todos los endpoints con autenticación JWT. Implementa registro, login y protección de rutas privadas.
13. **README**: Incluye instrucciones para instalar dependencias, configurar variables de entorno, correr migraciones y levantar el servidor.
14. **ORM**: Utiliza Prisma como ORM y especifica en la documentación cómo generar e instalar el cliente.
15. **Docker**: El proyecto debe ser completamente ejecutable en Docker. Incluye los siguientes archivos listos para producción:
    - `Dockerfile` para construir la imagen del backend.
    - `docker-compose.yml` para levantar el backend y una base de datos PostgreSQL.
    - Ejemplo de archivo `.env` compatible con Docker Compose y Prisma.
    - Instrucciones claras en el README para construir y ejecutar el entorno en Docker.

**Recomendaciones profesionales adicionales:**

- **Validación y DTOs:** Implementa DTOs para todas las rutas y usa `class-validator` y `class-transformer` para la validación y transformación de datos de entrada y salida.
- **Documentación Swagger:** Agrega documentación automática de los endpoints usando Swagger (`@nestjs/swagger`), accesible en `/api` o `/docs`.
- **Manejo de archivos:** Soporta subida de archivos (imágenes y archivos médicos) usando `@nestjs/platform-express` y Multer. Asegúrate de que los endpoints para archivos estén documentados.
- **Variables de entorno seguras:** El proyecto debe manejar variables sensibles solo mediante `.env` y nunca versionarlas.
- **Seeds y pruebas iniciales:** Incluye un script de seed para poblar la base de datos con datos de ejemplo y al menos un test de integración de ejemplo por recurso.
- **CORS y configuración global:** Habilita CORS y utiliza pipes globales de validación a nivel global.
- **Logs y manejo de errores:** Implementa manejo global de errores y logging básico, con filtros de excepción personalizados y logs de arranque.
- **Roles y permisos:** Implementa un sistema de roles (por ejemplo: admin, veterinario, cliente) y protege rutas según permisos y roles.
- **Buenas prácticas:** El proyecto debe seguir la estructura y convenciones profesionales recomendadas por la comunidad NestJS.

**Esquema Prisma a utilizar:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Category {
  id        Int       @id @default(autoincrement())
  name      String    @unique
  products  Product[]
  deleted   Boolean   @default(false)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Product {
  id          Int            @id @default(autoincrement())
  name        String
  description String?
  price       Float
  stock       Int
  categoryId  Int
  category    Category       @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  images      ProductImage[]
  deleted     Boolean        @default(false)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}

model ProductImage {
  id          Int       @id @default(autoincrement())
  productId   Int
  product     Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  url         String
  description String?
  order       Int?
  deleted     Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Client {
  id           Int           @id @default(autoincrement())
  name         String
  email        String        @unique
  phone        String?
  address      String?
  pets         Pet[]
  appointments Appointment[]
  deleted      Boolean       @default(false)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  userClients  UserClient[]
}

model Pet {
  id             Int             @id @default(autoincrement())
  name           String
  species        String
  breed          String?
  age            Int?
  weight         Float?
  clientId       Int
  client         Client          @relation(fields: [clientId], references: [id], onDelete: Cascade)
  medicalRecords MedicalRecord[]
  appointments   Appointment[]
  images         PetImage[]
  deleted        Boolean         @default(false)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
}

model PetImage {
  id          Int      @id @default(autoincrement())
  petId       Int
  pet         Pet      @relation(fields: [petId], references: [id], onDelete: Cascade)
  url         String
  description String?
  order       Int?
  deleted     Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model MedicalRecord {
  id            Int                  @id @default(autoincrement())
  petId         Int
  pet           Pet                  @relation(fields: [petId], references: [id], onDelete: Cascade)
  appointmentId Int?                 // Referencia a la atención (opcional)
  appointment   Appointment?         @relation(fields: [appointmentId], references: [id], onDelete: SetNull)
  visitDate     DateTime
  notes         String
  files         MedicalRecordFile[]
  deleted       Boolean              @default(false)
  createdAt     DateTime             @default(now())
  updatedAt     DateTime             @updatedAt
}

model MedicalRecordFile {
  id              Int           @id @default(autoincrement())
  medicalRecordId Int
  medicalRecord   MedicalRecord @relation(fields: [medicalRecordId], references: [id], onDelete: Cascade)
  url             String        // URL al archivo (imagen, PDF, etc.)
  name            String?       // Nombre del archivo
  fileType        String?       // Tipo MIME (opcional)
  deleted         Boolean       @default(false)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model Coupon {
  id             Int       @id @default(autoincrement())
  code           String    @unique
  description    String?
  discountType   DiscountType
  discountValue  Float
  maxUses        Int?
  expiresAt      DateTime?
  isActive       Boolean   @default(true)
  deleted        Boolean   @default(false)
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

enum DiscountType {
  PERCENTAGE
  AMOUNT
}

model ServiceType {
  id          Int            @id @default(autoincrement())
  name        String         @unique
  description String?
  durationMin Int
  appointments Appointment[]
  deleted     Boolean        @default(false)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}

model Appointment {
  id             Int                @id @default(autoincrement())
  date           DateTime
  reason         String?
  status         AppointmentStatus  @default(PENDING)
  notes          String?
  durationMin    Int
  clientId       Int
  client         Client             @relation(fields: [clientId], references: [id], onDelete: Cascade)
  petId          Int
  pet            Pet                @relation(fields: [petId], references: [id], onDelete: Cascade)
  serviceTypeId  Int
  serviceType    ServiceType        @relation(fields: [serviceTypeId], references: [id], onDelete: Restrict)
  medicalRecords MedicalRecord[]    // Relación inversa: todas las fichas asociadas a esta atención
  deleted        Boolean            @default(false)
  createdAt      DateTime           @default(now())
  updatedAt      DateTime           @updatedAt
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // Hash de la contraseña
  name      String
  role      UserRole @default(CLIENT)
  deleted   Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userClients UserClient[]
}

enum UserRole {
  ADMIN
  VET
  CLIENT
}

model UserClient {
  id        Int    @id @default(autoincrement())
  userId    Int
  clientId  Int
  user      User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  client    Client @relation(fields: [clientId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@unique([userId, clientId])
}
```

**Importante:**  
- Modela todas las relaciones, campos y reglas de baja lógica exactamente como en el esquema Prisma.  
- La autenticación JWT debe proteger todos los endpoints y el proyecto debe seguir la estructura modular recomendada por NestJS.
- El sistema debe estar preparado para desarrollarse y ejecutarse completamente en un entorno Docker, incluyendo los archivos necesarios para la construcción de la imagen y el despliegue con Docker Compose.
- Sigue todas las recomendaciones profesionales y de buenas prácticas mencionadas arriba.

** Muy importante: **
actualiza el checklist de hitos del backend veterinaria (AL FINALIZAR UN COMANDO) en el archivo `CHECKLIST.md` con los hitos completados y pendientes, asegurándote de que refleje el estado actual del proyecto.

