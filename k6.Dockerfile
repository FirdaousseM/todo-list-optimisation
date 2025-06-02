FROM golang:latest as builder

WORKDIR /k6

RUN go install go.k6.io/xk6/cmd/xk6@latest

RUN $(go env GOPATH)/bin/xk6 build --with github.com/grafana/xk6-output-prometheus-remote

FROM alpine:latest

RUN apk add --no-cache ca-certificates

COPY --from=builder /k6/k6 /usr/bin/k6

ENTRYPOINT ["k6"]
