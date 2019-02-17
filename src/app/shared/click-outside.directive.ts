import { Directive, ElementRef, HostListener, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickMatch = new EventEmitter();
  constructor(private el: ElementRef) { }
  @HostListener('document:click', ['$event.target'])
  onclick(targetElement: any) {
    // console.log('click ::', this.el);
    const clickedInside = this.el.nativeElement.contains(targetElement);
    const clickedOnSearch = targetElement.id;
    // console.log(clickedOnSearch);
    if (!clickedInside && clickedOnSearch !== 'searchTerm') {
      this.clickMatch.emit(clickedInside);
    }
  }
}
