import {ComponentRef, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {ConnectedPosition, Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {TooltipComponent} from './tooltip.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {
  @Input()
  toolTipText = '';

  @Input()
  position: 'top' | 'bottom' | 'start' | 'end' = 'top';

  private overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    private elRef: ElementRef,
  ) {
  }

  @HostListener('mouseenter')
  show() {
    const tooltipPortal = new ComponentPortal(TooltipComponent);

    const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(tooltipPortal);

    tooltipRef.instance.text = this.toolTipText;
  }

  @HostListener('mouseout')
  hide() {
    this.overlayRef.detach();
  }

  ngOnInit() {
    let tooltipPosition: ConnectedPosition;
    switch (this.position) {
      case 'bottom':
        tooltipPosition = {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 10
        };
        break;
      case 'top':
        tooltipPosition = {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -10
        };
        break;
      case 'end':
        tooltipPosition = {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 10
        };
        break;
      case 'start':
        tooltipPosition = {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -10
        };
        break;
      default:
        console.warn(`non standard tooltip position passed in. Expect ['top' | 'bottom' | 'start' | 'end'] got [${this.position}]`);
        break;
    }
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.elRef)
      .withPositions([tooltipPosition]);
    this.overlayRef = this.overlay.create({positionStrategy});
  }

}
