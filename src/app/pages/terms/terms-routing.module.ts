/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsComponent } from './terms.component';

const routes: Routes = [
  {
    path: '',
    component: TermsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsRoutingModule { }
