FROM golang:latest AS builder

WORKDIR /k6

RUN go install go.k6.io/xk6/cmd/xk6@latest

RUN $(go env GOPATH)/bin/xk6 build \
    --with github.com/grafana/xk6-output-prometheus-remote

FROM alpine:latest

RUN apk add --no-cache ca-certificates

ENV K6_PROMETHEUS_RW_TREND_STATS="p(95),p(99),min,max" \
    K6_PROMETHEUS_RW_TREND_SUMMARY="p(90),p(95),p(99),min,max" \
    K6_PROMETHEUS_RW_TREND_COUNT="p(90),p(95),p(99),min,max" \
    K6_PROMETHEUS_RW_SERVER_URL="http://prometheus:9090/api/v1/write"

COPY --from=builder /k6/k6 /usr/bin/k6
