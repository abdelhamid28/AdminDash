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

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  id: any = '';

  name: any = '';
  email: any = '';
  subjects: any = '';
  studies: any = '';
  terms: any = '';
  totalQuestions: any = 0;
  passingMarks: any = 0;
  negativeMarks: any = 0;


  dummy: any[] = [];
  exams: any[] = [];

  pages: any = 1;

  toppper: any[] = [];
  active = 0;


  public panes = [
    { name: 'Attempted', content: 'One' },
    { name: 'Exam Topper', content: 'Two' },
  ];

  activePane = 0;
  constructor(
    public util: UtilService,
    public api: ApiService,
    public navParam: ActivatedRoute
  ) {
    this.navParam.queryParams.subscribe((data: any) => {
      console.log(data);
      if (data && data.id && data.id != '') {
        this.id = data.id;
        this.getExamInfo();
      }
    })
  }

  onTabChange($event: number) {
    this.activePane = $event;
    console.log('onTabChange', $event);
  }

  getExamInfo() {
    this.util.show();
    this.dummy = Array(4);
    this.api.post_private('v1/exams/getExamStats', { id: this.id }).then((data: any) => {
      this.util.hide();
      this.dummy = [];
      console.log(data);
      if (data && data.status && data.status == 200 && data.data) {
        this.name = data.data.name;
        this.studies = data.data.studies.name;
        this.terms = data.data.terms.name;
        this.subjects = data.data.subjects.name;
        this.totalQuestions = data.data.totalQuestions;
        this.passingMarks = data.data.passingMarks;
        this.negativeMarks = data.data.negativeMarks;
        this.exams = data.attempted;
        this.toppper = data.topper.slice(0, 10);

      }
    }).catch((error) => {
      console.log(error);
      this.dummy = [];
      this.util.hide();
      this.util.apiErrorHandler(error);
    });
  }
  ngOnInit(): void {
  }
}
