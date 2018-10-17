#!/usr/bin/env bash
rm -rf ./public
mkdir public
cp -r ./data/cal ./public/
cp ./app/icons/favicon.ico ./public/
npm run build
