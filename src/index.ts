import Binance from 'node-binance-api';
import secretKey from './.secret.json';

const binance = new Binance().options({
  APIKEY: secretKey.APIKEY,
  APISECRET: secretKey.APISECRET,
  useServerTime: true,
});

async function main() {
  console.log('程序运行...');
  // await binance.useServerTime();
  let ticker = await binance.prices();
  console.info(`Price of BNB: ${ticker.BNBUSDT}`);
  // console.info(await binance.futuresPrices());
}

main();
