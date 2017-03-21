export default class Action {

  _actionData = null;

  /** motion name */
  _name = null;
  get name() { return this._name; }

  /** motion weight */
  _weight = 0;
  get weight() { return this._weight; }
  set weight(val) {
    if (val < 0) val = 0;
    if (1 < val) val = 1;
    this._weight = val;
    this._actionData.setEffectiveWeight(val);
  }

  /** playing flag */
  _isPlaying = false;
  get isPlaying() { return this._isPlaying; }
  set isPlaying(flg) { this._isPlaying = flg; }

  /**
   * @constructor
   */
  constructor(actionData, config) {
    this._name = config.name;
    this._actionData = actionData;
    this._actionData.setEffectiveWeight(0);

    if(!config.loop) {
      this._actionData.setLoop(THREE.LoopOnce, 0);
      this._actionData.clampWhenFinished = true;
    }
  }

  play() {
    this._actionData.play();
  }

  reset() {
    this._actionData.reset();
  }
}
