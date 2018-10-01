import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ShareModule } from './share/share.module';
import { LayoutComponent } from './layout.component';

import { AppComponent } from './app.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
    ShareModule,
    NgZorroAntdModule.forRoot(),
  ],
  entryComponents: [
    {{entryComponents}}
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
