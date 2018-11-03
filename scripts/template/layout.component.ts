import { Component, OnInit } from '@angular/core';
import { menus } from '../assets/menus';
import config from '../assets/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  list = menus;
  title = config.title;
  isCollapsed = false;
  language = '';

  constructor(private _router: Router) {
    const flg = this._router.url.split('/')[1];
    this.language = Object.keys(config.locales).findIndex(l => `/${flg}/` === l) > -1 ? flg : '';
  }

  switchLanguage(value: string) {
    let url = this._router.url;
    // English is ''
    if (this.language !== '') {
      url = this._router.url.split('/').slice(2).join('/');
    } 
    this.language = value;
    this._router.navigateByUrl(`/${value}${url}`);
  }

  ngOnInit(): void { }
}
