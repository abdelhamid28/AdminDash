/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamPaperComponent } from './exam-paper.component';

describe('ExamPaperComponent', () => {
  let component: ExamPaperComponent;
  let fixture: ComponentFixture<ExamPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamPaperComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExamPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
