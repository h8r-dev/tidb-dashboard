##
## Build
##
FROM golang:1.19 AS builder

WORKDIR /workdir

COPY ./ ./

RUN go build -o build/app cmd/tidb-dashboard/main.go

##
## Run
##
FROM golang:1.19

WORKDIR /workdir

COPY --from=builder /workdir/build/ ./

EXPOSE 12333

CMD ["sh", "-c", "./app --host 0.0.0.0"]
