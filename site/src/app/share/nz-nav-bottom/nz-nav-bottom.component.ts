import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import config from '../../../assets/config';

@Component({
  selector: 'nz-nav-bottom',
  template: `
    <section class="prev-next-nav">
      <a class="prev-page" *ngIf="index-1>=0" [routerLink]="list[index-1]?.path">
        <span>{{ list[index - 1]?.label }}</span><span class="chinese">{{ list[index - 1]?.title }}</span>
      </a>
      <a class="next-page" *ngIf="index+1<list?.length" [routerLink]="list[index+1]?.path">
        <span>{{ list[index + 1]?.label }}</span><span class="chinese">{{ list[index + 1]?.title }}</span>
      </a>
    </section>
  `
})
export class NzNavBottomComponent implements OnInit {
  list = [];
  index = 0;
  language = 'en';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = window.location.pathname.slice(1);
        this.language = this.router.url.split('/')[ this.router.url.split('/').length - 1 ].split('#')[ 0 ];
        const componentsList = config.sidebar.reduce((pre, cur) => {
          return pre.concat(cur.children);
        }, []);
        this.list = this.flatSidebar([ ...config.sidebar ]);
        this.index = this.list.findIndex(item => item.path === url);
      }
    });
  }

  flatSidebar(sidebarList: any[]) {
    const result = [];
    sidebarList.forEach(sidebar => {
      if (sidebar.children) {
        result.push(this.flatSidebar(sidebar.children));
      } else {
        result.push(sidebar);
      }
    });
    return result;
  }
}
