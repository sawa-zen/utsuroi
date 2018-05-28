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
  constructor(actor) {
    super();

    this._clock = new THREE.Clock();
    this._mixer = new THREE.AnimationMixer(actor);
    this._root = this._mixer.getRoot();

    this._actions = this._root.geometry.animations.map((actionData) => {
      let action = this._mixer.clipAction(actionData);
      return new Action(action);
    });
  }

  to(actionName, loop = false, duration) {
    let oldAction = this._currentAction;
    let newAction = this._findAction(actionName);

    this.emit('changeStart', {
      from: oldAction && oldAction.name,
      to: newAction.name
    });

    newAction.loop = loop;

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

  play(actionName, loop = false) {
    this._animationEnabled = true;

    if(actionName) {
      this.to(actionName, loop);
    }
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
