# ####################
# INSTALL
# ####################
# install dependencies
FROM node:lts-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN apk add yarn
WORKDIR /app
RUN ["yarn", "install", "--frozen-lockfile"]

# ####################
# BUILD
# ####################
# build image
FROM node:lts-alpine AS builder
RUN apk add yarn
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN ["yarn", "install", "--ignore-scripts", "--prefer-offline"]
RUN ["yarn", "build"] 

# ####################
# RUN
# ####################
# production image, copy all the files and run next
FROM node:lts-alpine as runner
RUN apk add curl
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S app -u 1001

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=app:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/. .
# COPY entrypoint.sh .

# fix environment variables
RUN apk add --no-cache --upgrade bash
# RUN ["chmod", "+x", "./entrypoint.sh"]
# ENTRYPOINT ["./entrypoint.sh"]

USER app
EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1