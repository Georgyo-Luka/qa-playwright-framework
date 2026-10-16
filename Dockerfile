# Official Playwright image already includes the browsers and their system dependencies.
# Keep this tag in sync with the @playwright/test version in package.json.
FROM mcr.microsoft.com/playwright:v1.48.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npx", "playwright", "test"]
