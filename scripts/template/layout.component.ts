import { Component, OnInit } from '@angular/core';
import { MENUS } from './menu';

@Component({
  selector: 'app-menu',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  list = MENUS;
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void { }
}
