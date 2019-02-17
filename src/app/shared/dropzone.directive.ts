import { Directive, HostListener, Output, HostBinding, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {
  @Output() fileDrop = new EventEmitter();
  constructor(private el: ElementRef) { }
  @HostBinding('style.background') background: string;

  @HostListener('document:drop', ['$event']) onDrop(e: any) {
    e.preventDefault();
    this.background = 'lightgrey';

    // console.log('dropzone', e);
    // console.log(e.dataTransfer.files[0]);
    this.fileDrop.emit(e);
  }

  @HostListener('document:dragover', ['$event']) onDragOver(e: any) {
    // console.log('dropzone', e);
    this.background = 'grey';
    e.preventDefault();
  }
  @HostListener('document:dragleave', ['$event']) onDragLeave(e: any) {
    this.background = 'lightgrey';
    e.preventDefault();
  }
}
