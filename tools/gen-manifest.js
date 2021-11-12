#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');

const outfile = process.argv[2];
const appinfo = JSON.parse(fs.readFileSync('assets/appinfo.json'));
const ipkfile = `${appinfo.id}_${appinfo.version}_all.ipk`;
const ipkhash = crypto.createHash('sha256').update(fs.readFileSync(ipkfile)).digest('hex');

fs.writeFileSync(
  outfile,
  JSON.stringify({
    id: appinfo.id,
    version: appinfo.version,
    type: appinfo.type,
    title: appinfo.title,
    appDescription: appinfo.appDescription,
    iconUri: 'https://raw.githubusercontent.com/webosbrew/youtube-webos/main/assets/icon160.png',
    sourceUrl: 'https://github.com/webosbrew/youtube-webos',
    rootRequired: true,
    ipkUrl: ipkfile,
    ipkHash: {
      sha256: ipkhash,
    },
  }),
);
