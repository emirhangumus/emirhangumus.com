FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install --force --production

EXPOSE 3000

RUN npx prisma generate
RUN npm uninstall bcrypt --force
RUN npm install bcryptjs --force
RUN npm install bcrypt --force

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p /app/.next/cache/images && chown nextjs:nodejs /app/.next/cache/images
VOLUME /app/.next/cache/images

VOLUME [ "/app/public/uploads" ]

CMD ["npm", "run", "dev"]