import { Component } from '@angular/core';

@Component({
  selector     : 'doc-test-zh',
  templateUrl  : './test-zh.html',
  preserveWhitespaces: false
})
export class TestZhComponent {
  goLink(link: string) {
    window.location.hash = link;
  }
}
