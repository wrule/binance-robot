import { Keeper } from './keeper';
import { nums } from '@wrule/nums';

const keeper = new Keeper();
// keeper.Start();

function aaa(text: string) {
  const execResult = /\d+/.exec(text);
  if (execResult != null && execResult.length > 0) {
    const num = Number(execResult[0]);
    if (text.endsWith('m')) {
      return num * 60;
    } else if (text.endsWith('h')) {
      return num * 60 * 60;
    } else if (text.endsWith('d')) {
      return num * 60 * 60 * 24;
    } else if (text.endsWith('w')) {
      return num * 60 * 60 * 24 * 7;
    } else if (text.endsWith('M')) {
      throw new Error('a');
    }
  }
  throw new Error('b');
}

// console.log(aaa('8w'));

import Binance from 'node-binance-api';
import secretJson from './.secret.json';
import moment, { Moment } from 'moment';

const binance = new Binance().options({
  APIKEY: secretJson.APIKEY,
  APISECRET: secretJson.APISECRET,
});

import { Trader } from './trader';
const trader1 = new Trader('ETHUSDT', '1d');
const trader2 = new Trader('ETHUSDT', '1m');
trader1.Start();
// trader2.Start();


interface IFrame {
  time: Moment,
  open: number,
  close: number,
  high: number,
  low: number,
  volume: number,
  isFinal: boolean,
}

function chartToFrames(chart: any) {
  const result = Object.entries(chart)
    .map(([key, value]) => ({ time: Number(key), data: value as any }))
    .sort((a, b) => a.time - b.time)
    .map((item) => ({
      time: moment(new Date(item.time)),
      open: Number(item.data.open),
      close: Number(item.data.close),
      high: Number(item.data.high),
      low: Number(item.data.low),
      volume: Number(item.data.volume),
      isFinal: item.data.isFinal !== false,
    } as IFrame));
  if (result.length > 0) {
    result[result.length - 1].isFinal = false;
  }
  return result;
}
