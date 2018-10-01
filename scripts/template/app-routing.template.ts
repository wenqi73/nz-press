import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

{{imports}}

const routes: Routes = [
  { path: '', redirectTo: '{{homeRoute}}', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,
    children: [
      {{router}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true,
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
