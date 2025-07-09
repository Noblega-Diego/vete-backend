#!/bin/sh

# Esperar a que la base de datos esté lista
echo "Esperando a que la base de datos esté lista..."
until nc -z db 5432; do
  echo "Esperando PostgreSQL..."
  sleep 1
done

echo "Base de datos lista. Ejecutando migraciones..."

# Ejecutar migraciones de Prisma
npx prisma migrate deploy

# Iniciar la aplicación
npm run start:prod
