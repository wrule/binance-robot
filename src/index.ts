import Binance from 'node-binance-api';
import secretKey from './.secret.json';
import moment from 'moment';

const binance = new Binance().options({
  APIKEY: secretKey.APIKEY,
  APISECRET: secretKey.APISECRET,
  useServerTime: true,
});

async function main() {
  console.log('程序运行...');
  let ticker = await binance.prices();
  console.info('LINK/USDT价格: ', ticker.LINKUSDT);
  // binance.buy('LINKUSDT', 1, 13);
  // console.log('已经下限价单');

  binance.websockets.chart('BTCUSDT', '30m', (symbol: any, interval: any, chart: any) => {
    const list = Object.entries(chart).map(([time, data]) => ({
      time: moment(new Date(Number(time))).format('YYYY-MM-DD HH:mm:ss'),
      ...(data as any),
    }));
    console.log(list[list.length - 2]);
  });

  // console.log('运行结束...');
}

main();
