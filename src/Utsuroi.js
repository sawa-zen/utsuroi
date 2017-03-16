module.exports = class Utsuroi {

  _mixer = null;
  _root = null;

  constructor(mixer) {
    this._mixer = mixer;
    this._root = mixer.getRoot();
  }
}
