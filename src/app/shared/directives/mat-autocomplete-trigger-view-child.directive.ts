import {AfterViewInit, ContentChild, Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {MatAutocompleteTrigger} from '@angular/material';

@Directive({
  selector: '[appMatAutocompleteTriggerViewChild]'
})
export class MatAutocompleteTriggerViewChildDirective  implements OnInit, AfterViewInit {

  @Output() viewChild = new EventEmitter<any>();

  @ContentChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.viewChild.emit(this.trigger);
  }

}
