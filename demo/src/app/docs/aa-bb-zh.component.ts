import { Component } from '@angular/core';

@Component({
  selector     : 'doc-aa-bb-zh',
  templateUrl  : './aa-bb-zh.html',
  preserveWhitespaces: false
})
export class AaBbZhComponent {
  goLink(link: string) {
    window.location.hash = link;
  }
}
