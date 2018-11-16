import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { menus } from '../../../assets/menus';
import config from '../../../assets/config';
import { ConfigService } from '../config.service';

@Component({
  selector: 'nz-nav-bottom',
  template: `
    <section class="prev-next-nav">
      <a class="prev-page" *ngIf="index-1>=0" [routerLink]="list[index-1]?.link">
        <i nz-icon type="left" class="footer-nav-icon-before"></i>
        <span>{{ list[index - 1]?.label }}</span><span class="chinese">{{ list[index - 1]?.title }}</span>
        <i nz-icon type="left" class="footer-nav-icon-after"></i>
      </a>
      <a class="next-page" *ngIf="index+1<list?.length" [routerLink]="list[index+1]?.link">
        <i class="anticon anticon-left footer-nav-icon-before"></i>
        <span>{{ list[index + 1]?.label }}</span><span class="chinese">{{ list[index + 1]?.title }}</span>
        <i nz-icon type="left" class="footer-nav-icon-after"></i>
      </a>
    </section>
  `
})
export class NzNavBottomComponent implements OnInit {
  list = [];
  index = 0;
  language = '';

  constructor(
    private router: Router,
    private service: ConfigService) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        this.language = this.service.getLangByUrl(url).name;
        const componentsList = menus.reduce((pre, cur) => {
          // TODO: attrType
          return pre.concat((cur as any).children);
        }, []);
        this.list = this.flatSidebar([ ...menus.filter(m => m.language === this.language) ]);
        this.index = this.list.findIndex(item => item.link === url);
      }
    });
  }

  flatSidebar(sidebarList: any[]) {
    const result = [];
    sidebarList.forEach(sidebar => {
      if (sidebar.children) {
        result.push(...this.flatSidebar(sidebar.children));
      } else {
        result.push(sidebar);
      }
    });
    return result;
  }
}
