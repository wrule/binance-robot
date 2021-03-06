
import moment, { Moment } from 'moment';
import Binance from 'node-binance-api';
import secretJson from '../.secret.json';

const binance = new Binance().options({
  APIKEY: secretJson.APIKEY,
  APISECRET: secretJson.APISECRET,
});

export interface IFrame {
  time: Moment,
  open: number,
  close: number,
  high: number,
  low: number,
  volume: number,
  isFinal: boolean,
}

export
abstract class Trader {
  public constructor(
    private symbol: string,
    private interval: string,
  ) { }

  private endpoint!: string;

  private chartToFrames(chart: any) {
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

  protected abstract watch(
    symbol: string,
    interval: string,
    frames: IFrame[],
  ): void;

  private callback(
    symbol: string,
    interval: string,
    chart: any,
  ) {
    if (
      symbol !== this.symbol ||
      interval !== this.interval ||
      Object.prototype.toString.call(chart) !== '[object Object]'
    ) {
      return;
    }
    const frames = this.chartToFrames(chart);
    if (frames.length < 1) {
      return;
    }
    this.watch(symbol, interval, frames);
  }

  public Start() {
    console.log('开启...');
    this.endpoint = binance.websockets.chart(
      this.symbol,
      this.interval,
      (
        symbol: string,
        interval: string,
        chart: any,
      ) => this.callback(symbol, interval, chart),
    );
  }

  public Stop() {
    console.log('关闭...');
    binance.websockets.terminate(this.endpoint);
  }
}
