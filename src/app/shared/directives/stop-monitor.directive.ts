import {AfterViewInit, ChangeDetectorRef, Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {FocusMonitor} from '@angular/cdk/a11y';

@Directive({
  selector: '[appStopMonitor]'
})
export class StopMonitorDirective implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef,
              private _focusMonitor: FocusMonitor,
              public changeDetctore: ChangeDetectorRef) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {

    this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    this.changeDetctore.detectChanges();
  }


  @HostListener('click') onClick() {
    // console.log('wwwww')
    this.elementRef.nativeElement.classList.remove('cdk-focused', 'cdk-mouse-focused');
    this._focusMonitor.stopMonitoring(this.elementRef.nativeElement);
    this.changeDetctore.detectChanges();
  }


}
