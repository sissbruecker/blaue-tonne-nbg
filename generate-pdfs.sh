#!/usr/bin/env bash
mkdir -p data
mkdir -p data/cal
python ./tools/generate-calendars.py ./tmp/flat.json ./data/cal
