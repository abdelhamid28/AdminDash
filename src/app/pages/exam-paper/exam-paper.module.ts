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

import { ExamPaperRoutingModule } from './exam-paper-routing.module';
import { ExamPaperComponent } from './exam-paper.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ExamPaperComponent
  ],
  imports: [
    CommonModule,
    ExamPaperRoutingModule,
    NgxSkeletonLoaderModule,
    NgxSpinnerModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ExamPaperModule { }
