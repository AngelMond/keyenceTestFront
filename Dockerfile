# Usa una imagen de Node.js como base
# FROM node:14

# Establece el directorio de trabajo en la carpeta de la aplicación
# WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
# COPY package*.json ./

# Instala las dependencias del proyecto
# RUN npm install

# Copia todos los archivos de la aplicación al directorio de trabajo
# COPY . .

# Compila la aplicación para producción
# RUN npm run build

# Expone el puerto 80 para que la aplicación sea accesible desde el exterior
# EXPOSE 8080

# Define el comando que se ejecutará al iniciar el contenedor
#CMD [ "npm", "run", "dev" ]
# CMD ["npx", "http-server", "-p", "80", "dist"]
# Etapa de compilación
FROM node:14 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:1.21
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]