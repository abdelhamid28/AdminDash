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

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dummy: any[] = [];
  dummyList: any[] = [];
  list: any[] = [];

  terms: any[] = [];
  termsId: any = 0;
  studiesId: any = 0;
  studies: any[] = [];
  page: number = 1;
  constructor(
    private api: ApiService,
    public util: UtilService,
    private router: Router
  ) {
    this.getStudies();
    this.getData();
  }


  getData() {
    this.dummy = Array(10);
    this.api.get_private('v1/auth/getAllStudents').then((data: any) => {
      this.dummy = [];
      console.log(data);
      if (data && data.status && data.status == 200 && data.data && data.data.length) {
        this.list = data.data;
        this.dummyList = data.data;
      }
    }, error => {
      this.dummy = [];
      console.log(error);
      this.util.apiErrorHandler(error);
    }).catch(error => {
      this.dummy = [];
      console.log(error);
      this.util.apiErrorHandler(error);
    });
  }


  getStudies() {
    this.util.show();
    this.api.get_private('v1/studies/getAll').then((data: any) => {
      this.util.hide();
      if (data && data.status && data.status == 200) {
        this.studies = data.data;
      }
    }).catch(error => {
      this.util.hide();
      console.log(error);
      this.util.apiErrorHandler(error);
    });
  }

  ngOnInit(): void {
  }

  search(str: any) {
    this.resetChanges();
    console.log('string', str);
    this.list = this.filterItems(str);
  }

  protected resetChanges = () => {
    this.list = this.dummyList;
  }

  filterItems(searchTerm: any) {
    return this.list.filter((item) => {
      return item.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.last_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  setFilteredItems() {
    console.log('clear');
    this.list = [];
    this.list = this.dummyList;
  }

  onStudiesChangeds() {
    this.util.show();
    this.terms = [];
    this.api.post_private('v1/terms/getByStudy', { id: this.studiesId }).then((data: any) => {
      this.util.hide();
      if (data && data.status && data.status == 200) {
        this.terms = data.data;
      }
    }).catch(error => {
      this.util.hide();
      console.log(error);
      this.util.apiErrorHandler(error);
    });
  }


  filter() {
    console.log(this.studiesId, this.termsId);
    if (this.studiesId && this.termsId) {
      console.log('filter it');
      this.list = this.dummyList.filter(x => x.study_id == this.studiesId && x.term_id == this.termsId);
    }
  }

  clear() {
    this.termsId = 0;
    this.studiesId = 0;
    this.list = this.dummyList;
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
