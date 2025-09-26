#!/bin/bash

geth --networkid 2025 \
  --http --http.addr 0.0.0.0 --http.port 8545 --http.api eth,net,web3,personal \
  --http.corsdomain "*" \
  --datadir "./data" \
  init genesis.json

geth --networkid 2025 \
  --http --http.addr 0.0.0.0 --http.port 8545 --http.api eth,net,web3,personal \
  --http.corsdomain "*" \
  --datadir "./data" \
  --allow-insecure-unlock \
  --nodiscover \
  --maxpeers 0 \
  --mine \
  --miner.threads=1 \
  console
