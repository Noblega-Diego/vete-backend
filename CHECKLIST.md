# Checklist de hitos del backend veterinaria

## ✅ Listo

- Inicialización del proyecto NestJS y configuración de Prisma, PostgreSQL en Docker, y migraciones iniciales.
- Creación de módulos, servicios, controladores y DTOs para todos los recursos principales (productos, categorías, clientes, mascotas, imágenes, fichas médicas, archivos médicos, citas, servicios, cupones).
- Implementación de endpoints CRUD REST, paginación y filtros.
- Pruebas e2e funcionales para productos, clientes y autenticación, con datos únicos en cada ejecución.
- Implementación de autenticación JWT: endpoints `/auth/register`, `/auth/login`, `/auth/me` y validación de flujo JWT.
- Protección de todos los endpoints de recursos principales con `JwtAuthGuard`.
- Restricción en el controlador de mascotas para que los usuarios con rol CLIENT solo puedan ver, crear, modificar y eliminar sus propias mascotas.
- Checklist de hitos (`CHECKLIST.md`) actualizado en cada avance.
- Detección de que no existe relación directa entre User y Client en el esquema Prisma actual.
- Aclaración de la necesidad de una tabla intermedia para vincular usuarios y clientes, ya que no todos los usuarios son clientes.
- Implementación de la relación entre usuarios y clientes mediante una tabla intermedia en el esquema Prisma.
- Actualización de migraciones para reflejar esta relación.
- Actualizar servicios y controladores para que los usuarios CLIENT solo puedan acceder a sus propios datos de cliente y mascotas según la relación UserClient.
- Restringir en el controlador de clientes que los usuarios CLIENT solo puedan acceder a sus propios datos.
- Restringir en el controlador de mascotas que los usuarios CLIENT solo puedan ver, modificar o eliminar mascotas de clientes vinculados a ellos.
- Documentación Swagger automática disponible en `/api`.
- Decoradores Swagger en DTOs y controladores principales.

## ⬜️ Pendiente

- Implementar sistema de roles y permisos más granular.
- Manejo de archivos (Multer), seeds, manejo global de errores/logs, CORS, Dockerfile, y documentación final.
- Pruebas de integración para otros recursos y protección de endpoints según roles.
