/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  id: any = '';
  exams: any[] = [];
  pages: any = 1;
  dummy: any[] = [];

  name: any = '';
  email: any = '';
  enroll: any = '';
  studies: any = '';
  terms: any = '';
  cover: any = '';
  active = 1;
  constructor(
    public util: UtilService,
    public api: ApiService,
    private route: ActivatedRoute,
    private navCtrl: LocationStrategy,
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      if (data && data.id) {
        this.id = data.id;
        this.dummy = Array(10);
        this.getUserInfo();
      } else {
        this.navCtrl.back();
      }
    });
  }

  ngOnInit() {
  }

  getUserInfo() {
    this.util.show();
    this.api.post_private('v1/attemptExam/getUserInfo', { id: this.id }).then((data: any) => {
      this.util.hide();
      this.dummy = [];
      console.log(data);
      if (data && data.status && data.status == 200 && data.data) {
        this.name = data.data.first_name + ' ' + data.data.last_name;
        this.cover = data.data.cover;
        this.email = data.data.email;
        this.enroll = data.data.enroll;
        this.studies = data.data.studies.name;
        this.terms = data.data.terms.name;
        this.exams = data.attempated;
      }
    }).catch(error => {
      this.util.hide();
      console.log(error);
      this.util.apiErrorHandler(error);
    });
  }



  getImage() {
    return this.api.imageUrl + this.cover;
  }
}
