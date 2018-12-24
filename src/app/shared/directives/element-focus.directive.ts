import {ChangeDetectorRef, Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appElementFocus]'
})
export class ElementFocusDirective implements OnInit {

  constructor(private cdRef: ChangeDetectorRef, public elementRef?: ElementRef) {
  }


  ngOnInit(): void {
    this.elementRef.nativeElement.focus();

    // add this to fixing error "Expression has changed after it was checked"
    this.cdRef.detectChanges();
  }


}
