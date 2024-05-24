/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  exam: any = 0;
  studies: any = 0;
  users: any = 0;
  subjects: any = 0;
  list: any[] = [];
  dummy: any[] = [];
  skeletonTheme = {
    'height.px': 20,
    'width.px': 20
  };
  students: any[] = [];
  constructor(
    public api: ApiService,
    public util: UtilService,
    private router: Router
  ) {
    this.getDashboard();
  }

  getDashboard() {

    this.dummy = Array(4);
    this.api.get_private('v1/dashboard/getDashboard').then((data: any) => {
      console.log(data);
      this.dummy = [];
      if (data && data.status && data.status == 200) {
        this.exam = data.exam;
        this.studies = data.studies;
        this.subjects = data.subjects;
        this.users = data.users;
        this.list = data.recentExam;
        this.list.forEach((element) => {
          element.startTime = moment(element.startTime).format('llll');
          element.endTime = moment(element.endTime).format('llll');
        });
        this.students = data.recentStudents;
      }
    }, error => {
      console.log(error);
      this.dummy = [];
      this.util.apiErrorHandler(error);
    }).catch((error: any) => {
      console.log(error);
      this.dummy = [];
      this.util.apiErrorHandler(error);
    });
  }

  ngOnInit() {

  }


  statusUpdate(item: any) {
    console.log('update status', item);
    const text = item.status === 1 ? 'Deactived' : 'Activate';
    Swal.fire({
      title: this.util.translate('Are you sure?'),
      text: this.util.translate('To ') + this.util.translate(text) + this.util.translate(' this item?'),
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: this.util.translate('Yes'),
      showCancelButton: true,
      cancelButtonText: this.util.translate('Cancel'),
      backdrop: false,
      background: 'white'
    }).then((data) => {
      if (data && data.value) {
        console.log('update it');
        console.log(item);
        item.status = item.status === 1 ? 0 : 1;
        const param = {
          id: item.id,
          status: item.status
        }
        this.util.show();
        this.api.post_private('v1/exams/update', param).then((data: any) => {
          console.log(data);
          this.util.hide();
          this.util.success('Updated');
        }, error => {
          console.log(error);
          this.util.hide();
        }).catch(error => {
          this.util.hide();
          console.log(error);
        });
      }
    });
  }


  onStats(id: any) {
    const param: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['stats'], param);
  }

  openExams() {
    this.router.navigate(['exams']);
  }

  openStudents() {
    this.router.navigate(['students']);
  }

  changeStatus(item: any) {
    console.log('update status', item);
    const text = item.status === 1 ? 'Deactived' : 'Activate';
    Swal.fire({
      title: this.util.translate('Are you sure?'),
      text: this.util.translate('To ') + this.util.translate(text) + this.util.translate(' this item?'),
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: this.util.translate('Yes'),
      showCancelButton: true,
      cancelButtonText: this.util.translate('Cancel'),
      backdrop: false,
      background: 'white'
    }).then((data) => {
      if (data && data.value) {
        console.log('update it');
        console.log(item);
        item.status = item.status === 1 ? 0 : 1;
        const param = {
          id: item.id,
          status: item.status
        }
        this.util.show();
        this.api.post_private('v1/user/update', param).then((data) => {
          console.log(data);
          this.util.hide();
          this.util.success('Updated');
        }, error => {
          console.log(error);
          this.util.hide();
          this.util.apiErrorHandler(error);
        }).catch(error => {
          this.util.hide();
          console.log(error);
          this.util.apiErrorHandler(error);
        });
      }
    });
  }

  openStudent(item: any) {
    console.log(item);
    const param: NavigationExtras = {
      queryParams: {
        id: item.id
      }
    };
    this.router.navigate(['user-profile'], param);
  }
}
