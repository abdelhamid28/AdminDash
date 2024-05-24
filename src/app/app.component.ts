/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { Title } from '@angular/platform-browser';
import { ApiService } from './services/api.service';
import { UtilService } from './services/util.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'Exam Admin';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private api: ApiService,
    public util: UtilService,
    private translate: TranslateService,
  ) {
    titleService.setTitle(this.title);

    // iconSet singleton
    iconSetService.icons = { ...brandSet, ...flagSet, ...freeSet };

    const lng = localStorage.getItem('selectedLanguage');
    if (!lng || lng == null) {
      localStorage.setItem('selectedLanguage', 'en');
      localStorage.setItem('direction', 'ltr');
    }

    this.translate.use(localStorage.getItem('selectedLanguage') || 'en');
    const direaction = localStorage.getItem('direction') as string;
    document.documentElement.dir = direaction;
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
