
FROM node:18 AS base
WORKDIR /app

# ---------------- Backend ----------------
FROM base AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# ---------------- Frontend ----------------
FROM base AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ---------------- deploys ----------------
FROM node:18 AS production
WORKDIR /app

COPY --from=backend /app/backend/dist ./backend/dist
COPY --from=backend /app/backend/package*.json ./backend/
COPY --from=frontend /app/frontend/build ./frontend/build

WORKDIR /app/backend
RUN npm install --production

EXPOSE 3000 3001

CMD ["sh", "-c", "node dist/server.js & npx serve ../frontend/build -l 3000"]
