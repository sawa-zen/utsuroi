export default class Action {

  _actionData = null;

  /** motion name */
  _name = null;
  get name() { return this._name; }

  _dulation = 300;
  get duration() { return this._duration; }

  _loopEnable = false;
  get loopEnable() { return this._loopEnable; }

  /** motion weight */
  _weight = 0;
  get weight() { return this._weight; }
  set weight(val) {
    if (val < 0) val = 0;
    if (1 < val) val = 1;
    this._weight = val;
    this._actionData.setEffectiveWeight(val);
  }

  /**
   * @constructor
   */
  constructor(actionData, config) {
    this._name = config.name;
    this._duration = config.duration || 300;
    this._loopEnable = !!config.loop;
    this._actionData = actionData;
    this._actionData.setEffectiveWeight(0);

    if(!this._loopEnable) {
      this._actionData.setLoop(2200, 0);
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
