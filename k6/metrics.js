// metrics.js
const { MeterProvider } = require("@opentelemetry/sdk-metrics");
const {
  OTLPMetricExporter,
} = require("@opentelemetry/exporter-metrics-otlp-http");

const exporter = new OTLPMetricExporter({
  url: "http://otel-collector:4318/v1/metrics",
});

const meterProvider = new MeterProvider();
meterProvider.addMetricReader(
  new PeriodicExportingMetricReader({
    exporter,
    exportIntervalMillis: 1000,
  })
);

const meter = meterProvider.getMeter("todolist-app");
const counter = meter.createCounter("example_counter");

setInterval(() => {
  counter.add(1, { route: "/todos" });
}, 1000);
