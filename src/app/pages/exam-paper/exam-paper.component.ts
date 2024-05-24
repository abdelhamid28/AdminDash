/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-paper',
  templateUrl: './exam-paper.component.html',
  styleUrls: ['./exam-paper.component.scss']
})
export class ExamPaperComponent implements OnInit {
  dummy: any[] = [];
  list: any[] = [];
  skeletonTheme = {
    'height.px': 20,
    'width.px': 20
  };

  isEdit: boolean = false;
  terms: any[] = [];
  termsId: any = 0;
  studiesId: any = 0;
  studies: any[] = [];
  subjectsId: any = 0;
  subjects: any[] = [];

  examinerName: any = '';
  examinerPhone: any = '';
  examinerPosition: any = '';

  totalQuestions: any = '';
  passingMarks: any = 0;
  questionsList: any[] = [];

  optionsIndex = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  minutesArray: any[] = [];
  secondsArray: any[] = [];

  haveNegative: any = 0;
  negativeMarks: any = 0;

  examId: any = '';

  startTime: any = '';
  endTime: any = '';

  sendNotification: boolean = false;
  submitted: boolean = false;

  examName: any = '';
  cover: any = '';
  constructor(
    public util: UtilService,
    public api: ApiService,
    private navCtrl: Location
  ) {
    for (let i = 0; i <= 30; i++) {
      this.minutesArray.push(i);
    }
    for (let i = 1; i <= 60; i++) {
      this.secondsArray.push(i);
    }
    this.getStudies();
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

  onTotalOptionsChanged(index: any) {
    console.log(this.questionsList[index].total_options);
    if (this.questionsList[index].total_options == null) {
      this.questionsList[index].total_options = 4;
      this.questionsList[index].options = [];
      for (let i = 1; i <= this.questionsList[index].total_options; i++) {
        this.questionsList[index].options.push({ 'answer': '' });
      }
    } else if (this.questionsList[index].total_options <= 5) {
      this.questionsList[index].options = [];
      for (let i = 1; i <= this.questionsList[index].total_options; i++) {
        this.questionsList[index].options.push({ 'answer': '' });
      }
    } else {
      this.util.error('Minimum Options are 0 to 5');
      this.questionsList[index].total_options = 4;
      this.questionsList[index].options = [];
      for (let i = 1; i <= this.questionsList[index].total_options; i++) {
        this.questionsList[index].options.push({ 'answer': '' });
      }
    }

  }

  onLengthChanged() {
    console.log(this.totalQuestions);
    this.questionsList = [];
    for (let i = 1; i <= this.totalQuestions; i++) {
      const items = {
        id: i,
        qustion: '',
        options: [],
        total_options: 0,
        haveImage: false,
        imageURL: '',
        answer: null,
        minute: 0,
        secounds: 0
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



  saveData(currentStatus: any) {
    console.log(this.studiesId, this.termsId, this.subjectsId);
    console.log(this.haveNegative, this.negativeMarks);
    console.log(this.negativeMarks < 0);


    this.submitted = true;
    if (this.cover == '' || this.cover == null || this.examName === '' || !this.examName || this.studiesId === '' || !this.studiesId || this.termsId === '' || !this.termsId || this.subjectsId === '' || !this.subjectsId ||
      this.examinerName === '' || !this.examinerName || this.examinerPhone === '' || !this.examinerPhone || this.examinerPosition === '' || !this.examinerPosition ||
      this.totalQuestions === '' || !this.totalQuestions || this.passingMarks === 0 || !this.passingMarks ||
      this.startTime === '' || !this.startTime || this.endTime === '' || !this.endTime) {
      this.util.error('All fields are required');
      return false;
    }
    console.log(currentStatus, this.startTime, this.endTime, this.sendNotification);


    const questions = this.questionsList.map(x => x.qustion);
    // console.log('questions=> ', questions, questions.includes(''));

    if (questions.includes('')) {
      this.util.error('Questions are missings');
      return false;
    }

    const total_options = this.questionsList.map(x => x.total_options);
    if (total_options.includes(0)) {
      this.util.error('Total Options are missings')
      return false;
    }

    const options: any = [];
    this.questionsList.forEach(element => {
      element.options.forEach((items: any) => {
        options.push(items.answer);
      });
    });
    // console.log('answer=>', options, options.includes(null));
    if (options.includes('')) {
      this.util.error('Options are missings');
      return false;
    }

    const answer = this.questionsList.map(x => x.answer);
    // console.log('answer=>', answer, answer.includes(null));
    if (answer.includes(null)) {
      this.util.error('Answer are missings');
      return false;
    }

    const minutes = this.questionsList.map(x => x.minute);
    // console.log('minutes=>', minutes, minutes.includes(0));
    if (minutes.includes(0)) {
      this.util.error('Minutes are missings');
      return false;
    }

    const secounds = this.questionsList.map(x => x.secounds);
    // console.log('secounds=>', secounds, secounds.includes(0));
    if (secounds.includes(0)) {
      this.util.error('Secounds are missings');
      return false;
    }
    console.log(this.questionsList);
    const qustionList: any = [];
    const answerKeys: any = [];
    this.questionsList.forEach(element => {
      const question = {
        id: element.id,
        haveImage: element.haveImage,
        imageURL: element.imageURL,
        minute: element.minute,
        options: element.options,
        qustion: element.qustion,
        secounds: element.secounds,
      };
      const answerKey = {
        id: element.id,
        answer: element.answer
      };
      answerKeys.push(answerKey);
      qustionList.push(question);
    });
    console.log(answerKeys, qustionList);
    const param = {
      cover: this.cover,
      name: this.examName,
      examinerName: this.examinerName,
      examinerPhone: this.examinerPhone,
      examinerPosition: this.examinerPosition,
      study_id: this.studiesId,
      term_id: this.termsId,
      subject_id: this.subjectsId,
      totalQuestions: this.totalQuestions,
      passingMarks: this.passingMarks,
      haveNegative: this.haveNegative,
      negativeMarks: this.negativeMarks,
      startTime: this.startTime,
      endTime: this.endTime,
      status: currentStatus
    };





    console.log('param==>>', param);

    this.util.show();
    this.api.post_private('v1/exams/save', param).then((data: any) => {
      console.log(data);
      if (data && data.status && data.status == 200 && data.data.id) {
        const examParam = {
          exam_id: data.data.id,
          questionsList: JSON.stringify(qustionList),
          status: currentStatus
        };
        this.api.post_private('v1/questions/save', examParam).then((data: any) => {
          if (data && data.status && data.status == 200 && data.data.id) {
            const answerParam = {
              exam_id: data.data.id,
              keys: JSON.stringify(answerKeys),
              status: currentStatus
            }
            this.api.post_private('v1/answers/save', answerParam).then((data: any) => {
              if (data && data.status && data.status == 200 && data.data.id) {
                console.log('exam param==>>', examParam);
                this.util.hide();
                console.log('answer param==>>', answerParam);
                this.util.success('Exam Saved');
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


  uploadQuestionImage(files: any, index: any) {
    console.log(files, this.questionsList[index]);
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    if (files) {

      this.util.show();
      console.log('ok');
      this.api.uploadFile(files).subscribe((data: any) => {
        console.log('==>>>>>>', data.data);
        this.util.hide();
        if (data && data.data.image_name) {
          this.questionsList[index].imageURL = data.data.image_name;
        }
      }, err => {
        console.log(err);
        this.util.hide();
      });

    } else {
      console.log('no');
    }
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
          this.examinerName = '';
          this.examinerPhone = '';
          this.examinerPosition = '';
          this.subjectsId = null;
          this.termsId = null;
          this.studiesId = null;
          this.haveNegative = false;
          this.passingMarks = 0;
          this.totalQuestions = null;
          this.questionsList = [];
        }
      });
    } else {
      this.examinerName = '';
      this.examinerPhone = '';
      this.examinerPosition = '';
      this.subjectsId = null;
      this.termsId = null;
      this.studiesId = null;
      this.haveNegative = false;
      this.passingMarks = 0;
      this.totalQuestions = null;
      this.questionsList = [];
    }
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
}
