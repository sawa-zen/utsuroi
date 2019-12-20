import THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import EventEmitter from 'eventemitter3'
import { Action } from './action'

export class Manipulator extends EventEmitter {
  private clock: THREE.Clock = new THREE.Clock()
  private mixer: THREE.AnimationMixer
  private root: THREE.SkinnedMesh
  private animationEnabled = false
  private actions: Action[] = []
  private currentAction?: Action

  get currentActionName() {
    return this.currentAction && this.currentAction.getName()
  }

  constructor(scene: THREE.Scene, animations: THREE.AnimationClip[]) {
    super();

    this.clock = new THREE.Clock()
    this.mixer = new THREE.AnimationMixer(scene)
    this.root = this.mixer.getRoot() as THREE.SkinnedMesh

    this.actions = animations.map((animationClip) => {
      let action = this.mixer.clipAction(animationClip)
      return new Action(action)
    });
  }

  private findAction(name: string) {
    return this.actions.find((action) => {
      return action.getName() === name
    })
  }

  public to(actionName: string, duration: number, loop = false) {
    const oldAction = this.currentAction
    const newAction = this.findAction(actionName)

    if (!newAction) {
      console.warn(`${actionName} is not found`)
      return
    }

    this.emit('changeStart', {
      from: oldAction && oldAction.getName(),
      to: newAction.getName()
    })

    this.currentAction = newAction
    newAction.setLoop(loop)
    newAction.reset()
    newAction.play()

    const param = { weight: 0 }
    const tween = new TWEEN.Tween(param)
      .to({ weight: 1 }, duration)
      .onUpdate(function() {
        if(oldAction) {
          oldAction.setWeight(1 - param.weight)
        }
        newAction.setWeight(param.weight)
      })
      .onComplete(() => {
        this.emit('changeComplete', {
          from: oldAction && oldAction.getName(),
          to: newAction.getName()
        });
      })

    tween.start()
  }

  public play(actionName: string, loop = false) {
    this.animationEnabled = true

    if(actionName) {
      this.to(actionName, 0, loop)
    }
  }

  public pause() {
    this.animationEnabled = true
  }

  public update() {
    if(!this.animationEnabled) return
    let delta = this.clock.getDelta()
    this.mixer.update(delta)
    TWEEN.update()
  }
}
