import {ChangeDetectorRef, Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appElementFocus]'
})
export class ElementFocusDirective implements OnInit {

  constructor(private cdRef: ChangeDetectorRef, public elementRef?: ElementRef) {
  }


  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
    this.cdRef.detectChanges();
  }


}
