# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Metrics export

The container embeds a [Prometheus Node Exporter](https://github.com/prometheus/node_exporter) instance to expose
system metrics on port `9100`. These metrics can be scraped by an existing Prometheus server.

## Logs export

The image includes [Grafana Alloy](https://grafana.com/docs/alloy/latest/) to forward
system and Nginx logs to a Loki instance. Configure the `LOKI_URL` environment variable
with the Loki push URL when running the container.
