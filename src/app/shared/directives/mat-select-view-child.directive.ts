import {AfterViewInit, ContentChild, Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSelect} from '@angular/material';

@Directive({
  selector: '[appMatSelectViewChild]'
})
export class MatSelectViewChildDirective implements OnInit, AfterViewInit {

  @Output() viewChild = new EventEmitter<any>();

  @ContentChild(MatSelect) select: MatSelect;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.viewChild.emit(this.select);
  }





}
