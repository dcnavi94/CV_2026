FROM node:20-alpine

WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Exponer puerto
EXPOSE 8000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
