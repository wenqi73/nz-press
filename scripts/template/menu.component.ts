import { Component, OnInit } from '@angular/core';
import { MENUS } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  list = MENUS;
  constructor() { }

  ngOnInit(): void { }
}
