module.exports = class Utsuroi {

  _mixer = null;
  _root = null;
  _animationEnabled = false;

  /**
   * @constructor
   */
  constructor(mixer) {
    this._mixer = mixer;
    this._root = mixer.getRoot();

    console.info(this._root.geometry.animations);
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
    this._mixer.update(delta);
  }
}
