import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'app';

  constructor(
    private translate: TranslateService,
    private httpClient: HttpClient
  ) {
    translate.addLangs(['zh']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('zh');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('zh');
  }
}
