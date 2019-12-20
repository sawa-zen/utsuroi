declare module "@tweenjs/tween.js" {
  export class Tween {
    constructor(param: any) // TODO
    start(): void
    to(option: any, duration: number): Tween
    onUpdate(callback: () => void): Tween
    onComplete(callback: () => void): Tween
  }
  export function update(): void
}