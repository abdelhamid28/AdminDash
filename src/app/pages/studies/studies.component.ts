/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit {
  cover: any = '';
  name: any = '';
  id: any;
  dummy: any[] = [];
  list: any[] = [];
  skeletonTheme = {
    'height.px': 20,
    'width.px': 20
  };

  isEdit: boolean;
  page: number = 1;
  constructor(
    public util: UtilService,
    public api: ApiService,
  ) {
    this.isEdit = false;
    this.dummy = Array(5);
    this.getList();
  }

  getList() {
    this.api.get_private('v1/studies/getAll').then((data: any) => {
      this.dummy = [];
      if (data && data.status && data.status == 200) {
        this.list = data.data;
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

  clearData() {
    this.cover = '';
    this.name = '';
    this.id = '';
    this.isEdit = false;
  }

  exportCSV() {

  }

  importCSV() {

  }

  preview_banner(files: any) {
    console.log('fle', files);
    if (files.length == 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    if (files) {
      console.log('ok');
      this.util.show();
      this.api.uploadFile(files).subscribe((data: any) => {
        console.log('==>>>>>>', data.data);
        this.util.hide();
        if (data && data.data.image_name) {
          this.cover = data.data.image_name;
        }
      }, err => {
        console.log(err);
        this.util.hide();
      });
    } else {
      console.log('no');
    }
  }

  saveData() {
    if (this.cover === '' || this.cover === null || this.name === '' || this.name === null) {
      this.util.error('All Fields are required');
      return false;
    }
    const param = {
      name: this.name,
      cover: this.cover,
      status: 1,
    };
    this.util.show();
    this.api.post_private('v1/studies/save', param).then((data: any) => {
      console.log(data);
      this.util.hide();
      if (data && data.status && data.status == 200) {
        this.getList();
        this.clearData();
      } else {
        this.util.error('Something went wrong');
      }
    }).catch((error) => {
      console.log(error);
      this.util.hide();
      this.util.apiErrorHandler(error);
    });

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
        this.util.show();
        this.api.post_private('v1/studies/update', item).then((data: any) => {
          console.log(data);
          this.util.hide();
          this.util.success('Updated');
          this.clearData();
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

  editData(item: any) {
    console.log('update info', item);
    this.isEdit = true;
    this.id = item.id;
    this.cover = item.cover;
    this.name = item.name;
  }


  updateData() {
    if (this.cover === '' || this.cover === null || this.name === '' || this.name === null) {
      this.util.error('All Fields are required');
      return false;
    }
    const param = {
      id: this.id,
      name: this.name,
      cover: this.cover,
    };
    this.util.show();
    this.api.post_private('v1/studies/update', param).then((data: any) => {
      console.log(data);
      this.util.hide();
      if (data && data.status && data.status == 200) {
        this.getList();
        this.clearData();
      } else {
        this.util.error('Something went wrong');
      }
    }).catch((error) => {
      console.log(error);
      this.util.hide();
      this.util.apiErrorHandler(error);
    });

  }

}
