import { LoopRepeat, LoopOnce } from 'three';
import { AnimationAction } from 'three/src/animation/AnimationAction';

export class Action {
  private actionData: AnimationAction
  private name: string
  private weight: number = 0
  
  constructor(actionData: AnimationAction) {
    this.name = actionData.getClip().name;
    this.actionData = actionData;
    this.actionData.setEffectiveWeight(0);
  }

  public getName() { return this.name; }
  
  public getWeight = () => { return this.weight; }  
  
  public setWeight(val: number) {
    if (val < 0) val = 0;
    if (1 < val) val = 1;
    this.weight = val;
    this.actionData.setEffectiveWeight(val);
  }
  
  public setLoop = (val: boolean) => {
    this.actionData.loop = val ? LoopRepeat : LoopOnce
  }
  
  public play() {
    this.actionData.play();
  }

  public reset() {
    this.actionData.reset();
  }
}
