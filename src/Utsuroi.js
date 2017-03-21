import {_} from 'lodash';
import TWEEN from 'tween.js';
import Action from './Action';

/**
 * Utsuroi
 */
module.exports = class Utsuroi {

  _mixer = null;
  _root = null;
  _animationEnabled = false;
  _actions = [];
  _currentAction = null;

  /**
   * @constructor
   */
  constructor(mixer, actionConfigs) {
    this._mixer = mixer;
    this._root = mixer.getRoot();

    this._actions = _.map(actionConfigs, (actionConfig) => {
      let name = actionConfig.name;
      let actionData = _.find(this._root.geometry.animations, (animation) => {
        return animation.name == name;
      });

      if(!actionData) {
        return console.error(`${name} is not found.`);
      }

      let action = this._mixer.clipAction(actionData);
      return new Action(action, actionConfig);
    });
  }

  to(actionName, duration = 70) {
    let oldAction = this._currentAction;
    let newAction = this._findAction(actionName);
    newAction.reset();
    newAction.play();
    let param = { weight: 0 };
    let tween = new TWEEN.Tween(param)
      .to({ weight: 1 }, duration)
      .onUpdate(function() {
        if(oldAction) {
          oldAction.weight = 1 - this.weight;
        }
        newAction.weight = this.weight;
        console.info(this.weight);
      })
      .start();
    this._currentAction = newAction;
  }

  play() {
    this._animationEnabled = true;
  }

  pause() {
    this._animationEnabled = true;
  }

  update(delta) {
    if(!this._animationEnabled) return;
    this._mixer.update(delta);
    TWEEN.update();
  }

  _findAction(name) {
    return _.find(this._actions, (action) => {
      return action.name === name;
    });
  }
}
