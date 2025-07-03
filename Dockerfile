# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.25 AS production
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl ca-certificates tar unzip \
    && rm -rf /var/lib/apt/lists/*
ARG NODE_EXPORTER_VERSION=1.9.1
ARG ALLOY_VERSION=1.9.2
RUN curl -L https://github.com/prometheus/node_exporter/releases/download/v${NODE_EXPORTER_VERSION}/node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz \
        | tar xz && \
    mv node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64/node_exporter /usr/local/bin/ && \
    rm -r node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64 && \
    curl -L https://github.com/grafana/alloy/releases/download/v${ALLOY_VERSION}/alloy-linux-amd64.zip -o alloy.zip && \
    unzip alloy.zip && mv alloy-linux-amd64 /usr/local/bin/alloy && rm alloy.zip && \
    apt-get purge -y --auto-remove curl ca-certificates tar unzip && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY alloy.yaml /etc/alloy/config.yaml
EXPOSE 80 9100 12345
CMD ["/bin/sh", "-c", "node_exporter & /usr/local/bin/alloy --config.file=/etc/alloy/config.yaml & nginx -g 'daemon off;'" ]
