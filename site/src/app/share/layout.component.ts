import { Component, OnInit, Inject } from '@angular/core';
import { menus } from '../../assets/menus';
import { Router } from '@angular/router';
import { Language, ConfigService } from './config.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  list = menus;
  title;
  isCollapsed = false;
  language;
  languages;
  oldLanguageName;

  constructor(
    private _router: Router,
    private configSrv: ConfigService,
    @Inject(DOCUMENT) private doc
  ) {
    this.languages = this.configSrv.languages;
    this.configSrv.languageChange$.subscribe(config => {
      this.title = config.title;
      this.doc.documentElement.lang = config.lang;
      this.doc.title = config.title;
      this.doc.description = config.description;
    })
    this.init();
  }

  switchLanguage(value: Language) {
    let url;
    // old language is not English
    if (this.oldLanguageName !== '') {
      url = this._router.url.split('/').slice(2).join('/');
    } else {
      url = this._router.url;
    }
    this._router.navigateByUrl(`/${value.name}${url}`).then(() => this.init());
  }

  init() {
    this.language = this.configSrv.getLangByUrl(this._router.url);
    this.configSrv.change();
    this.oldLanguageName = this.language.name;
  }

  ngOnInit(): void { }
}
