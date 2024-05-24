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

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from 'ngx-spinner'
import { FormsModule } from '@angular/forms';
import { NavModule, TabsModule } from '@coreui/angular';


@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'progress-dark' }),
    NgxPaginationModule,
    FormsModule,
    NavModule,
    TabsModule
  ]
})
export class StatsModule { }
