export default class Action {

  _actionData = null;

  /** motion weight */
  _weight = 0;
  get weight() { return this._weight; }
  set weight(val) {
    if (val < 0) val = 0;
    if (1 < val) val = 1;
    this._weight = val;
  }

  /** playing flag */
  _isPlaying = false;
  get isPlaying() { return this._isPlaying; }
  set isPlaying(flg) { this._isPlaying = flg; }

  /**
   * @constructor
   */
  constructor(actionData) {
    this._actionData = actionData;
    this._actionData.setEffectiveWeight(1);
  }

  play() {
    this._actionData.play();
    console.info('play');
  }

  reset() {
  }
}
