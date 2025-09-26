#!/bin/bash
geth --datadir ./batman-node init ./genesis.json
geth --datadir ./batman-node --networkid 2025 --http --http.addr 0.0.0.0 --http.port 8545 --http.api personal,eth,net,web3,txpool --allow-insecure-unlock --nodiscover --miner.threads=1 --mine --syncmode full
