import {AfterContentChecked, AfterViewChecked, AfterViewInit, Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appElementFocus]'
})
export class ElementFocusDirective implements OnInit {

  constructor(public elementRef?: ElementRef) {
  }


  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }



}
