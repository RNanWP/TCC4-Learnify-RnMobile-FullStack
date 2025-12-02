 
 FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:20-alpine AS build

WORKDIR /app

COPY --from=deps /app/node_modules node_modules

COPY tsconfig.json .

COPY src src

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules node_modules

COPY --from=build /app/dist dist

COPY .env ./

EXPOSE 3000

CMD ["node", "dist/server.js"]

 
 
#  Build
# FROM node:20-slim AS builder

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# RUN npm prune --production

# # Produção
# FROM node:20-slim

# WORKDIR /usr/src/app

# COPY --from=builder /usr/src/app/package*.json ./

# COPY --from=builder /usr/src/app/node_modules ./node_modules

# COPY --from=builder /usr/src/app/dist ./dist

# EXPOSE 3000

# # Comando para iniciar a aplicação
# CMD [ "node", "dist/server.js" ]
# # CMD ["npm", "start", "run", "dev", "dist/server.js"]
# # CMD ["npm", "start"]
# # CMD [ "ls", "-R" ]