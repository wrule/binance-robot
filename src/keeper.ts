import moment, { Moment } from 'moment';

export
class Keeper {
  public constructor(
    private interval = 1000,
  ) { }

  private timer!: number;

  private tick(time: Moment) {
    const seconds = time.diff(time.clone().startOf('year'), 'seconds');
    const num = seconds % 3600;
    const diff = 3600 - num;
    if (num <= 5) {
      console.log('关闭', time.format('YYYY-MM-DD HH:mm:ss'));
    }
    if (diff <= 5) {
      console.log('开启', time.format('YYYY-MM-DD HH:mm:ss'));
    }
  }

  public Start() {
    clearTimeout(this.timer);
    this.tick(moment(new Date()));
    this.timer = setTimeout(() => {
      this.Start();
    }, this.interval);
  }

  public Stop() {
    clearTimeout(this.timer);
  }
}
