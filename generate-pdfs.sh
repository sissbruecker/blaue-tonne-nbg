#!/usr/bin/env bash
mkdir -p data
mkdir -p data/cal
python ./tools/generate-pdfs.py ./tmp/flat.json ./data/cal
