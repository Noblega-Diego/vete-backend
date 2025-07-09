# Usar la imagen oficial de Node.js como base
FROM node:18-alpine

# Instalar netcat para verificar la conexión a la base de datos
RUN apk add --no-cache netcat-openbsd

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Generar el cliente de Prisma
RUN npx prisma generate

# Construir la aplicación
RUN npm run build

# Hacer el script ejecutable
RUN chmod +x start.sh

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Comando para ejecutar el script de inicio
CMD ["./start.sh"]
