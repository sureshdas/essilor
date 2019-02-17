import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  url: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    if (this.data.type === 'DOCUMENT' || this.data.type === 'VIDEO') {
      // console.log('dfdf');
      this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.url);
    } else {
      this.url = this.data.url;
    }
    // console.log('type', this.data.type);
    // console.log('url', this.data.url);
  }

}
