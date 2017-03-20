// @flow weak
import {_} from 'lodash';
import Action from './Action';

module.exports = class Utsuroi {

  _mixer:any = null;
  _root:any = null;
  _animationEnabled:boolean = false;
  _actions:Array<Action> = [];

  /**
   * @constructor
   */
  constructor(mixer, defaultAction:string) {
    this._mixer = mixer;
    this._root = mixer.getRoot();

    this._actions = _.map(this._root.geometry.animations, (animation) => {
      let name = animation.name;
      let action = this._mixer.clipAction(animation);
      return new Action(name, this._mixer.clipAction(animation));
    });

    this._actions[3].play();
  }

  to(actionName:string, duration:number = 300) {
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
  update(delta:number) {
    if(!this._animationEnabled) return;
    this._mixer.update(delta);
  }
}
