/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.scss']
})
export class MyLearningComponent implements OnInit {
  dummy: any[] = [];
  list: any[] = [];
  skeletonTheme = {
    'height.px': 20,
    'width.px': 20
  };
  page: number = 1;
  constructor(
    public util: UtilService,
    public api: ApiService,
    private router: Router
  ) {
    this.dummy = Array(5);
    this.getList();
  }

  getList() {
    this.api.get_private('v1/learning/getAll').then((data: any) => {
      this.dummy = [];
      if (data && data.status && data.status == 200) {
        this.list = data.data;
        this.list.forEach((element) => {
          element.startTime = moment(element.startTime).format('llll');
          element.endTime = moment(element.endTime).format('llll');
        })
      }
    }).catch(error => {
      this.list = [];
      this.dummy = [];
      console.log(error);
      this.util.apiErrorHandler(error);
    });
  }

  ngOnInit(): void {
  }

  createNew() {
    console.log('naviate');
    this.router.navigate(['manage-learning']);
  }

  exportCSV() {

  }

  importCSV() {

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
        this.api.post_private('v1/learning/update', param).then((data: any) => {
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

}
