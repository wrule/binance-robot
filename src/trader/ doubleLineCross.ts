import { IFrame, Trader } from '.';

export
abstract class DoubleLineCross
extends Trader {
  protected abstract fastLine(frames: IFrame[]): number[];
  protected abstract slowLine(frames: IFrame[]): number[];

  protected watch(
    symbol: string,
    interval: string,
    frames: IFrame[],
  ): void {
    const fastLine = this.fastLine(frames);
    const slowLine = this.slowLine(frames);
    if (fastLine.length > 1 && slowLine.length > 1) {
      const previousFast = fastLine[fastLine.length - 2];
      const currentFast = fastLine[fastLine.length - 1];
      const previousSlow = slowLine[slowLine.length - 2];
      const currentSlow = slowLine[slowLine.length - 1];
      if (
        currentFast > currentSlow &&
        previousFast <= previousSlow
      ) {
        console.log('买');
      }
      if (
        currentFast < currentSlow &&
        previousFast >= previousSlow
      ) {
        console.log('卖');
      }
      console.log(previousFast, currentFast, previousSlow, currentSlow);
    }
    console.log(frames[frames.length - 1]);
  }
}
