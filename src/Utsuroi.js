import {_} from 'lodash';
import Action from './Action';

module.exports = class Utsuroi {

  _mixer = null;
  _root = null;
  _animationEnabled = false;
  _actions = [];

  /**
   * @constructor
   */
  constructor(mixer) {
    this._mixer = mixer;
    this._root = mixer.getRoot();

    this._actions = _.map(this._root.geometry.animations, (animation) => {
      return new Action(this._mixer.clipAction(animation));
    });

    this._actions[3].play();
  }

  /**
   * @param {string} actionName
   * @param {number} duration
   */
  to(actionName, duration = 300) {
  }

  play() {
    this._animationEnabled = true;
  }

  pause() {
    this._animationEnabled = true;
  }

  /**
   * @param {number} delta
   */
  update(delta) {
    if(!this._animationEnabled) return;
    console.info(delta);
    this._mixer.update(delta);
  }
}
