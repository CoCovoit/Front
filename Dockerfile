# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Add the environment variables
ENV VITE_API_ENDPOINT=http://localhost:44318
ENV VITE_KEYCLOAK_REALM=company1
ENV VITE_KEYCLOAK_URL=http://localhost:8081/
ENV VITE_KEYCLOAK_CLIENTID=web-app

RUN npm run build

# Production stage
FROM nginx:1.25-alpine AS production
RUN apk add --no-cache curl tar
ARG NODE_EXPORTER_VERSION=1.9.1
RUN curl -L https://github.com/prometheus/node_exporter/releases/download/v${NODE_EXPORTER_VERSION}/node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz \
    | tar xz && \
    mv node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64/node_exporter /usr/local/bin/ && \
    rm -r node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64 && \
    apk del curl tar
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80 9100
CMD ["/bin/sh", "-c", "node_exporter & nginx -g 'daemon off;'" ]
