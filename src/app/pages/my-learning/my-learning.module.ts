/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyLearningRoutingModule } from './my-learning-routing.module';
import { MyLearningComponent } from './my-learning.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyLearningComponent
  ],
  imports: [
    CommonModule,
    MyLearningRoutingModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'progress-dark' }),
    NgxPaginationModule,
    FormsModule
  ]
})
export class MyLearningModule { }
