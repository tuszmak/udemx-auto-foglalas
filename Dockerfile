FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY ./frontend /app
WORKDIR /app
RUN pnpm i

EXPOSE 4200
CMD [ "pnpm", "start_docker" ]