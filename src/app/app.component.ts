import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgxMoveableComponent, OnClickGroup, OnDrag, OnDragGroup, OnEvent, OnResize, OnResizeGroup, OnResizeGroupStart, OnResizeStart, OnRotate, OnRotateGroup, OnRotateGroupStart, OnRotateStart, OnScale, OnScaleGroup, OnScaleGroupStart, OnScaleStart } from 'ngx-moveable';
import { NgxSelectoComponent } from 'ngx-selecto';
import { PlaceholderFactory } from './factories/placeholder.factory';
import { ActionType } from './models/action-type.enum';
import { ImagePlaceholderViewModel, TextPlaceholderViewModel } from './placeholder/placeholder-view.model';
import { PlaceholderTransformationService } from './services/placeholder-transformation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('moveable', { static: false }) moveable!: NgxMoveableComponent;
  @ViewChild('selecto', { static: false }) selecto!: NgxSelectoComponent;
  @ViewChildren('pl', { read: ElementRef }) placeholderElements!: QueryList<ElementRef>;
  protected selectedElements = new Array<HTMLElement | SVGElement>();
  protected placeholders = new Array<ImagePlaceholderViewModel | TextPlaceholderViewModel>();
  protected imagePlaceholders = new Array<ImagePlaceholderViewModel>();
  protected textPlaceholders = new Array<TextPlaceholderViewModel>();
  protected isScalable: boolean = false;
  protected elementGuidelines: Array<ElementRef> = [];
  protected actionType = ActionType;

  constructor(
    private placeholderTransformationService: PlaceholderTransformationService,
    private placeholderFactory: PlaceholderFactory
    ) {
    this.placeholders = this.placeholderFactory.create();
    this.imagePlaceholders = this.placeholders.filter(p => p instanceof ImagePlaceholderViewModel) as ImagePlaceholderViewModel[];
    this.textPlaceholders = this.placeholders.filter(p => p instanceof TextPlaceholderViewModel) as TextPlaceholderViewModel[];
  }
  ngAfterViewInit(): void {
    this.generateSnapLines();
  }

  protected onSelect(e: any) {
    this.selectedElements = e.selected;
  }

  protected onSelectEnd(e: any) {
    if (e.isDragStart) {
      e.inputEvent.preventDefault();

      setTimeout(() => {
        this.moveable.ngDragStart(e.inputEvent);
      });
    }
  }

  // Single placeholder operations
  protected onDragStart(e: any) {
    const target = e.inputEvent.target; //
    if (this.moveable.isMoveableElement(target) || this.selectedElements.some(t => t === target || t.contains(target)) || target.tagName === "SPAN") {
      e.stop();
    }
  }
  protected onDrag(e: OnDrag) {
    const pl = this.getElementById(e.target.id);
    pl.translate = e.translate;
    e.target.style.transform = e.transform;
  }

  protected onSinglePlaceholderActionStart(e: OnEvent, type: ActionType) {
    switch (type) {
      case ActionType.Resize:
        this.placeholderTransformationService.onResizeStart(e as OnResizeStart, this.getElementById(e.target.id));
        break;
      case ActionType.Rotate:
        this.placeholderTransformationService.onRotateStart(e as OnRotateStart, this.getElementById(e.target.id));
        break;
      case ActionType.Scale:
        this.placeholderTransformationService.onScaleStart(e as OnScaleStart, this.getElementById(e.target.id));
        break;
    }
  }

  protected onSinglePlaceholderAction(e: OnEvent, type: ActionType) {
    switch (type) {
      case ActionType.Resize:
        this.placeholderTransformationService.onResize(e as OnResize, this.getElementById(e.target.id));
        break;
      case ActionType.Rotate:
        this.placeholderTransformationService.onRotate(e as OnRotate, this.getElementById(e.target.id));
        break;
      case ActionType.Scale:
        this.placeholderTransformationService.onScale(e as OnScale, this.getElementById(e.target.id));
        break;
    }
  }

  // Multi placeholder operations
  protected onClickGroup(e: OnClickGroup) {
    this.selecto.clickTarget(e.inputEvent, e.inputTarget);
  }

  protected onDragGroup(group: OnDragGroup) {
    group.events.forEach((ev) => {
      const pl = this.getElementById(ev.target.id);
      pl.translate = ev.translate;
      ev.target.style.transform = ev.transform;
    });
  }

  protected onResizeGroupStart({ events }: OnResizeGroupStart): void {
    events.forEach((ev) => {
      const pl = this.getElementById(ev.target.id);
      this.placeholderTransformationService.onResizeStart(ev, pl);
    });
  }
  protected onResizeGroup({ events }: OnResizeGroup): void {
    events.forEach((ev) => {
      const pl = this.getElementById(ev.target.id);
      this.placeholderTransformationService.onResize(ev, pl);
    });
  }

  protected onRotateGroupStart({ events }: OnRotateGroupStart) {
    events.forEach((ev) => {
      const pl = this.getElementById(ev.target.id);
      this.placeholderTransformationService.onRotateStart(ev, pl);
    });
  }
  protected onRotateGroup({ events }: OnRotateGroup) {
    events.forEach((ev) => {
      const pl = this.getElementById(ev.target.id);
      this.placeholderTransformationService.onRotate(ev, pl);
    });
  }

  protected onScaleGroupStart({ events }: OnScaleGroupStart) {
    events.forEach((ev) => {
      const pl = this.getElementById(ev.target.id);
      this.placeholderTransformationService.onScaleStart(ev, pl);
    });
  }

  protected onScaleGroup({ events }: OnScaleGroup) {
    events.forEach((ev) => {
      const pl = this.getElementById(ev.target.id);
      this.placeholderTransformationService.onScale(ev, pl);
    });
  }


  protected scalingResizingToggle(): void {
    this.isScalable = !this.isScalable;
  }

  protected onKeyUp() {
    this.moveable.updateRect();
  }

  private getElementById(id: string): ImagePlaceholderViewModel | TextPlaceholderViewModel {
    const el = this.placeholders.find(p => p.id === id);
    return el!;
  }

  private generateSnapLines() {
    this.placeholderElements.forEach(p => {
      this.elementGuidelines.push(p.nativeElement);
    });
  }
}