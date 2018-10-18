#!/usr/bin/env bash
mkdir -p data
python ./tools/generate-index.py ./tmp/flat.json ./data/index.json
