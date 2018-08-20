import { Component } from '@angular/core';

@Component({
  selector     : 'doc-child-zh',
  templateUrl  : './child-zh.html',
  preserveWhitespaces: false
})
export class ChildZhComponent {
  goLink(link: string) {
    window.location.hash = link;
  }
}
