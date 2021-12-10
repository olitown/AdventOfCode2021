import { solution1 } from './solution1';
import * as _ from 'lodash';
import { range, result, values } from 'lodash';
import { cachedDataVersionTag } from 'v8';

class App {
  /** Entry point of our app */
  public static start() {
    console.log(solution1());
  }
}

App.start();
