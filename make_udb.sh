#!/bin/sh
curl 'ftp://ftp.unicode.org/Public/9.0.0/ucd/UnicodeData.txt'>UnicodeData.txt
python make_unidb.py > unidb.json
