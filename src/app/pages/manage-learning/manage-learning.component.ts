/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-learning',
  templateUrl: './manage-learning.component.html',
  styleUrls: ['./manage-learning.component.scss']
})
export class ManageLearningComponent implements OnInit {
  isEdit: boolean = false;
  terms: any[] = [];
  termsId: any = 0;
  studiesId: any = 0;
  studies: any[] = [];
  subjectsId: any = 0;
  subjects: any[] = [];
  questionsList: any[] = [];
  creatorName: any = '';
  creatorPhone: any = '';
  creatorPosition: any = '';
  totalQuestions: any = '';
  learningName: any = '';
  cover: any = '';

  learningId: any = '';

  sendNotification: boolean = false;
  submitted: boolean = false;
  constructor(
    public util: UtilService,
    public api: ApiService,
    private navCtrl: Location
  ) {

    this.getStudies();
  }
  ngOnInit(): void {
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

  onLengthChanged() {
    console.log(this.totalQuestions);
    this.questionsList = [];
    for (let i = 1; i <= this.totalQuestions; i++) {
      const items = {
        id: i,
        qustion: '',
        haveImage: false,
        imageURL: '',
        answer: '',
      };
      this.questionsList.push(items);
    }
    console.log(this.questionsList);
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

  onTermsChangeds() {
    this.util.show();
    this.api.post_private('v1/subjects/getSubjectsFromStudiesAndTerms', { study_id: this.studiesId, term_id: this.termsId }).then((data: any) => {
      console.log(data);
      this.util.hide();
      if (data && data.status && data.status == 200) {
        this.subjects = data.data;
      }
    }).catch(error => {
      console.log(error);
      this.util.apiErrorHandler(error);
      this.util.show();
    });
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

  saveData(currentStatus: any) {
    this.submitted = true;
    if (this.cover == '' || this.cover == null || this.learningName === '' || !this.learningName || this.studiesId === '' || !this.studiesId ||
      this.termsId === '' || !this.termsId || this.subjectsId === '' || !this.subjectsId ||
      this.creatorName === '' || !this.creatorName || this.creatorPhone === '' || !this.creatorPhone || this.creatorPosition === '' || !this.creatorPosition ||
      this.totalQuestions === '' || !this.totalQuestions) {
      this.util.error('All fields are required');
      return false;
    }

    const questions = this.questionsList.map(x => x.qustion);

    if (questions.includes('')) {
      this.util.error('Questions are missings');
      return false;
    }

    const answer = this.questionsList.map(x => x.answer);
    if (answer.includes(null)) {
      this.util.error('Answer are missings');
      return false;
    }

    const param = {
      name: this.learningName,
      cover: this.cover,
      study_id: this.studiesId,
      term_id: this.termsId,
      subject_id: this.subjectsId,
      content: JSON.stringify(this.questionsList),
      creator_name: this.creatorName,
      creator_phone: this.creatorPhone,
      creator_position: this.creatorPosition,
      totalQuestions: this.questionsList.length,
      status: currentStatus
    };
    this.util.show();
    this.api.post_private('v1/learning/save', param).then((data: any) => {
      this.util.hide();
      if (data && data.status && data.status == 200 && data.data.id) {
        this.util.success('Learning Saved');
        this.navCtrl.back();
      } else {
        this.util.hide();
        this.util.error('Something went wrong');
      }
    }, error => {
      console.log(error);
      this.util.hide();
      this.util.apiErrorHandler(error);
    }).catch((error: any) => {
      console.log(error);
      this.util.hide();
      this.util.apiErrorHandler(error);
    });
  }


  clearData(alert?: any) {
    console.log(alert);
    if (alert) {
      Swal.fire({
        title: this.util.translate('Are you sure?'),
        text: this.util.translate('To clear this data?'),
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
          this.creatorName = '';
          this.creatorPhone = '';
          this.creatorPosition = '';
          this.subjectsId = null;
          this.termsId = null;
          this.studiesId = null;
          this.questionsList = [];
        }
      });
    } else {
      this.creatorName = '';
      this.creatorPhone = '';
      this.creatorPosition = '';
      this.subjectsId = null;
      this.termsId = null;
      this.studiesId = null;
      this.questionsList = [];
    }
  }
}
