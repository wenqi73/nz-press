import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { MenuComponent } from './menu.component';

{{imports}}

@NgModule({
  imports     : [
    ShareModule,
    RouterModule.forChild([
      {
        path: '', component: MenuComponent,
        children: [

          {{router}}

        ]
      }
    ])
  ],
  declarations: [
    MenuComponent,
    
    {{declarations}}

  ]
})
export class DocsModule {

}
