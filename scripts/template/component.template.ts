import { Component } from '@angular/core';

@Component({
  selector     : 'doc-{{component}}-{{language}}',
  templateUrl  : './{{component}}-{{language}}.html',
  preserveWhitespaces: false
})
export class {{componentName}}Component {
  goLink(link: string) {
    window.location.hash = link;
  }
}
