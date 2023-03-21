import { Injectable } from '@angular/core';
import { ImagePlaceholderViewModel, TextPlaceholderViewModel } from '../placeholder/placeholder-view.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceholderFactory {
  public create(): Array<ImagePlaceholderViewModel | TextPlaceholderViewModel> {
    const placeholders = new Array<
      ImagePlaceholderViewModel | TextPlaceholderViewModel
    >();
    placeholders.push(new ImagePlaceholderViewModel([0, 0], 0, 200, 180, 100, 50, [1, 1], '../assets/dove.jpg'));
    placeholders.push(new ImagePlaceholderViewModel([0, 0], 0, 300, 200, 250, 100, [1, 1], '../assets/grace.jpg'));
    placeholders.push(new ImagePlaceholderViewModel([0, 0], 0, 80, 100, 100, 200, [1, 1], '../assets/jesus.jpg'));
    placeholders.push(new ImagePlaceholderViewModel([0, 0], 0, 100, 100, 100, 300, [1, 1], '../assets/plane.svg'));
    placeholders.push(new TextPlaceholderViewModel([0, 0], 0, 200, 100, 100, 300, [1, 1], 'Lorem ipsum dolor sit amet', 2, 'cursive'));

    return placeholders;
  }
}
