import { Injectable } from '@angular/core';
import { OnResize, OnResizeStart, OnRotate, OnRotateStart, OnScale, OnScaleStart } from 'ngx-moveable';
import { BasePlaceholderViewModel } from '../placeholder/placeholder-view.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderTransformationService {  
  public onResizeStart(e: OnResizeStart, placeholder: BasePlaceholderViewModel) {
    e.setOrigin(["%", "%"]);
    e.dragStart && e.dragStart.set(placeholder.translate);
  }
  public onResize(e: OnResize, placeholder: BasePlaceholderViewModel) {
    const beforeTranslate = e.drag.beforeTranslate;

   placeholder.translate = beforeTranslate;
    e.target.style.width = `${e.width}px`;
    e.target.style.height = `${e.height}px`;
    this.setTransform(e.target, beforeTranslate, placeholder.rotate, placeholder.scale);
  }

  public onRotateStart(e: OnRotateStart, placeholder: BasePlaceholderViewModel) {
    e.set(placeholder.rotate);
  }

  public onRotate(e: OnRotate, placeholder: BasePlaceholderViewModel) {
    placeholder.rotate = e.rotation;
    this.setTransform(e.target, placeholder.translate, e.rotation, placeholder.scale);
  }

  public onScaleStart(e: OnScaleStart, placeholder: BasePlaceholderViewModel) {
    e.set(placeholder.scale);
    e.dragStart && e.dragStart.set(placeholder.translate);
  }

  public onScale(e: OnScale, placeholder: BasePlaceholderViewModel) {
    const beforeTranslate = e.drag.beforeTranslate;

    placeholder.translate = beforeTranslate;
    placeholder.scale = e.scale;
    this.setTransform(e.target, beforeTranslate, placeholder.rotate, e.scale);
  }

  private setTransform(target: HTMLElement | SVGElement, translate: number[], rotate: number, scale: number[]) {
    target.style.transform = `translate(${translate[0]}px, ${translate[1]}px) rotate(${rotate}deg)`
      + ` scale(${scale[0]}, ${scale[1]})`;
  }
}
