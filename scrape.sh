#!/usr/bin/env bash
rm -rf tmp
mkdir tmp
scrapy runspider "./scraper/scraper.py" -o "./tmp/flat.json" -s LOG_FILE="./tmp/scrape.log" -s LOG_LEVEL="INFO" -s FEED_EXPORT_ENCODING="utf-8"
