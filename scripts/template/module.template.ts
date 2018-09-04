import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { LayoutComponent } from './layout.component';

{{imports}}

@NgModule({
  imports     : [
    ShareModule,
    RouterModule.forChild([
      {
        path: '', component: LayoutComponent,
        children: [

          {{router}}

        ]
      }
    ])
  ],
  declarations: [
    LayoutComponent,
    
    {{declarations}}

  ]
})
export class DocsModule {

}
