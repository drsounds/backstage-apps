#!/bin/bash
sh /root/.nvm/nvm.sh use 22;
yarn tsc;
yarn build:backend;
docker image build . -f packages/backend/Dockerfile --tag backstage;