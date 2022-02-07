import { Keeper } from './keeper';

const keeper = new Keeper();
keeper.Start();

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

console.log(aaa('8w'));