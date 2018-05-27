import THREE from 'three';
import TWEEN from 'tween.js';
import EventEmitter from 'eventemitter3';
import Action from './Action';

/**
 * Utsuroi
 */
export default class Utsuroi extends EventEmitter {

  _clock = null;
  _mixer = null;
  _root = null;
  _animationEnabled = false;
  _actions = [];
  _currentAction = null;

  get currentActionName() {
    return this._currentAction && this._currentAction.name;
  }

  /**
   * @constructor
   */
  constructor(actor, defaultActionName) {
    super();

    this._clock = new THREE.Clock();
    this._mixer = new THREE.AnimationMixer(actor);
    this._root = this._mixer.getRoot();
    this._defaultActionName = defaultActionName;

    this._actions = this._root.geometry.animations.map((actionData) => {
      let action = this._mixer.clipAction(actionData);
      return new Action(action);
    });

    if(this._defaultActionName) {
      this.to(this._defaultActionName, 1);
    }
  }

  to(actionName, duration) {
    let oldAction = this._currentAction;
    let newAction = this._findAction(actionName);

    this.emit('changeStart', {
      from: oldAction && oldAction.name,
      to: newAction.name
    });

    newAction.reset();
    newAction.play();

    let param = { weight: 0 };
    let tween = new TWEEN.Tween(param)
      .to({ weight: 1 }, duration || 200)
      .onUpdate(function() {
        if(oldAction) {
          oldAction.weight = 1 - this.weight;
        }
        newAction.weight = this.weight;
      })
      .onComplete(() => {
        this.emit('changeComplete', {
          from: oldAction && oldAction.name,
          to: newAction.name
        });
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

  update() {
    if(!this._animationEnabled) return;
    let delta = this._clock.getDelta();
    this._mixer.update(delta);
    TWEEN.update();
  }

  _findAction(name) {
    return this._actions.find((action) => {
      return action.name === name;
    });
  }
}
