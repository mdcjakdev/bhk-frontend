import {AfterViewInit, ContentChild, Directive, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSelect, MatTooltip} from '@angular/material';

@Directive({
  selector: '[appMatTooltipAsNotification]'
})
export class MatTooltipAsNotificationDirective implements OnInit, AfterViewInit {

  @Output() tooltipInit = new EventEmitter<any>();

  @ContentChild(MatTooltip) tooltip: MatTooltip;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tooltipInit.emit(this.tooltip);
  }

}
