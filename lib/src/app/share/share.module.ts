import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgZorroAntdModule
} from 'ng-zorro-antd';

import { NzHighlightModule } from './nz-highlight/nz-highlight.module';
import { NzNavBottomModule } from './nz-nav-bottom/nz-nav-bottom.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    NzHighlightModule,
    NzNavBottomModule,
    // third libs
    // ColorSketchModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    NzHighlightModule,
    // third libs
  ]
})
export class ShareModule { }
