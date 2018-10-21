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

  constructor(private _router: Router) { }

  switchLanguage(value: string) {
    console.log(this._router.url);
    let url = this._router.url;
    if (this.language !== '') {
      url = this._router.url.split('/').slice(1).join('/');
    } 
    this.language = value;
    this._router.navigate(['/', value, url])
  }

  ngOnInit(): void { }
}
