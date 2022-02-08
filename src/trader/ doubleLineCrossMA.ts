import { DoubleLineCross } from './ doubleLineCross';
import { nums } from '@wrule/nums';
import { IFrame } from '.';

export
class DoubleLineCrossMA
extends DoubleLineCross {
  protected fastLine(frames: IFrame[]): number[] {
    return nums(frames.map((frame) => frame.close).slice(1)).MA(12).Nums;
  }

  protected slowLine(frames: IFrame[]): number[] {
    return nums(frames.map((frame) => frame.close).slice(1)).MA(21).Nums;
  }
}
