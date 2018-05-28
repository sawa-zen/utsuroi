import THREE from 'three';

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

  _loop = THREE.LoopOnce;
  set loop(val) {
    this._loop = val;
    this._actionData.loop = this._loop ? THREE.LoopRepeat : THREE.LoopOnce;
  }

  /**
   * @constructor
   */
  constructor(actionData) {
    this._name = actionData.getClip().name;
    this._actionData = actionData;
    this._actionData.setEffectiveWeight(0);
  }

  play() {
    this._actionData.play();
  }

  reset() {
    this._actionData.reset();
  }
}
