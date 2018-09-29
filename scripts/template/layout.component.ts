import { Component, OnInit } from '@angular/core';
import config from '../assets/config';

@Component({
  selector: 'app-menu',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  list = config.sidebar;
  isCollapsed = false;
  language = 'zh';

  constructor() { }

  ngOnInit(): void { }
}
