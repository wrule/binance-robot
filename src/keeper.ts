import moment, { Moment } from 'moment';

export
class Keeper {
  public constructor(
    private interval = 1000,
  ) { }

  private timer!: number;

  private tick(time: Moment) {
    console.log(time.format('HH:mm:ss'));
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
