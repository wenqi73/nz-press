import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './layout.component';

import { AppComponent } from './app.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';

{{imports}}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    {{declarations}}
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    NgZorroAntdModule.forRoot(),
  ],
  entryComponents: [
    {{entryComponents}}
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
