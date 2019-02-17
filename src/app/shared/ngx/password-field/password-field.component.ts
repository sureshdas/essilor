import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements OnInit {
  @Input() metaInfo: any;
  @Input() model: any;
  constructor() { }

  ngOnInit() {
  }

}
