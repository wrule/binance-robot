
console.log('你好，世界');

import Binance from 'node-binance-api';

const binance = new Binance().options({
  APIKEY: '<key>',
  APISECRET: '<secret>'
});

async function main() {
  console.info(await binance.futuresPrices());
}

main();
