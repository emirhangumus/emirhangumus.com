FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci

EXPOSE 3000

RUN npx prisma generate
RUN npm uninstall bcrypt
RUN npm install bcryptjs
RUN npm install bcrypt

RUN npm run build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p /app/.next/cache/images && chown nextjs:nodejs /app/.next/cache/images
VOLUME /app/.next/cache/images

VOLUME [ "/app/public/uploads" ]

CMD ["npm", "run", "start"]
