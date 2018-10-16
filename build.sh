#!/usr/bin/env bash
rm -rf ./public
mkdir public
cp -r ./data/cal ./public/
npm run build
