# Dockerfile

# 1. Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 3. Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# --- Added environment variables ---
ENV GEMINI_API_KEY="AIzaSyDGh-Wmzf-RrDsUtAvbbI-0WFLjRKRqdRc"
ENV NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyBnmDo3PgolkA-oWaglMDhjQ9dY7MK1ZQU"
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="studio-8029359938-e47f4.firebaseapp.com"
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID="studio-8029359938-e47f4"
ENV NEXT_PUBLIC_FIREBASE_APP_ID="1:117075730063:web:9aabd6248f32c10c291afa"
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="117075730063"
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-7WEYMJN6GG"
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="studio-8029359938-e47f4.firebasestorage.app"
# -----------------------------------

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]
