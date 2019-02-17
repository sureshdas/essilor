import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { AuthenticationService } from '../../authentication/authentication.service';
import { I18nService } from '../../i18n.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @Input() sidenav: MatSidenav;
  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    // private i18nService: I18nService
  ) { }

  ngOnInit() { }

  // setLanguage(language: string) {
  //   this.i18nService.language = language;
  // }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  // get currentLanguage(): string {
  //   return this.i18nService.language;
  // }

  // get languages(): string[] {
  //   return this.i18nService.supportedLanguages;
  // }

  get username(): string {
    // const credentials = this.authenticationService.credentials;
    // console.log('cred', credentials);
    // return credentials ? credentials.username : null;
    return JSON.parse(localStorage.getItem('userInfo')).firstName;
  }

  // get title(): string {
  //   return this.titleService.getTitle();
  // }

  showDropdown(event: any = '') {
    const dom: any = document.querySelector('.dropdown');
    const status: any = dom.style.display;
    if (status === 'block') {
      dom.style.display = 'none';
    } else {
      dom.style.display = 'block';
    }
  }
}
