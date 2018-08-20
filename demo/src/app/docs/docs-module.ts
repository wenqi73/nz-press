import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';

import { AaBbZhComponent } from './aa-bb-zh.component';
import { ChildZhComponent } from './child-dd/child-zh.component';
import { TestZhComponent } from './test-zh.component';


@NgModule({
  imports     : [
    ShareModule,
    RouterModule.forChild([
      {'path': 'aa-bb', 'component': AaBbZhComponent },
{'path': 'child-dd/child', 'component': ChildZhComponent },
{'path': 'test', 'component': TestZhComponent },

    ])
  ],
  declarations: [
    		AaBbZhComponent,
		ChildZhComponent,
		TestZhComponent,

  ]
})
export class DocsModule {

}
