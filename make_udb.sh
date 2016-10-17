#!/bin/sh
curl 'ftp://ftp.unicode.org/Public/9.0.0/ucd/UnicodeData.txt'>UnicodeData.txt
node make_udb.js > unindb.json
