import { Component, OnInit } from '@angular/core';
import { menus } from '../../assets/menus';
import config from '../../assets/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  list = menus;
  title = config.title;
  isCollapsed = false;
  languages;
  language;
  private _langs = [
    { name: '', text: 'English' },
    { name: 'zh', text: '中文' },
  ];
  oldLanguageName;

  constructor(private _router: Router) {
    const flg = this._router.url.split('/')[1];
    const configLangs = Object.keys(config.locales) || [];
    // find languages exist in config.js, replace '//' to '/'
    this.languages = this._langs.filter(lang => configLangs.includes(`/${lang.name}/`.replace(/\/\//, '/')));
    // default is English
    this.language = this.languages.find(l => flg === l.name) || { name: '', text: 'English' };
    this.oldLanguageName = this.language.name;
  }

  switchLanguage(value: { name: string, text: string }) {
    let url = this._router.url;
    // old language is not English
    if (this.oldLanguageName !== '') {
      url = this._router.url.split('/').slice(2).join('/');
    }
    this.oldLanguageName = this.language.name;
    this._router.navigateByUrl(`/${value.name}${url}`);
  }

  ngOnInit(): void { }
}
