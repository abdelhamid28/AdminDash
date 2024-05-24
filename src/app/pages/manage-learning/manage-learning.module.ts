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

import { ManageLearningRoutingModule } from './manage-learning-routing.module';
import { ManageLearningComponent } from './manage-learning.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManageLearningComponent
  ],
  imports: [
    CommonModule,
    ManageLearningRoutingModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'progress-dark' }),
    FormsModule
  ]
})
export class ManageLearningModule { }
