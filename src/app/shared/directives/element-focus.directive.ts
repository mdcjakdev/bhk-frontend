import {ChangeDetectorRef, Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appElementFocus]',
})
export class ElementFocusDirective implements OnInit {

  @Input() isInsert;

  constructor(private cdRef: ChangeDetectorRef, public elementRef?: ElementRef) {
  }

  ngOnInit(): void {
    if (this.isInsert === undefined || this.isInsert) {
      this.elementRef.nativeElement.focus();
      // add this to fixing error "Expression has changed after it was checked"
      this.cdRef.detectChanges();
    }
  }


}
