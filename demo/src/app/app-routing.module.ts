import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'docs', loadChildren: './docs/docs.module#DocsModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
