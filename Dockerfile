FROM mcr.microsoft.com/playwright:v1.56.0-jammy

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

RUN npx playwright install --with-deps

COPY . .

CMD ["node", "index.js"]

EXPOSE 3000

CMD ["npx", "playwright", "test"]