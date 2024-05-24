/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Exam Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { AuthGuard } from './guard/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './pages/auth/page404/page404.component';
import { Page500Component } from './pages/auth/page500/page500.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LeaveGuard } from './leaved/leaved.guard';
import { SetupAuthGuard } from './setupGuard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/auth/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'studies',
        loadChildren: () => import('./pages/studies/studies.module').then(m => m.StudiesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'terms',
        loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'subjects',
        loadChildren: () => import('./pages/subjects/subjects.module').then(m => m.SubjectsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'exams',
        loadChildren: () => import('./pages/exams/exams.module').then(m => m.ExamsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'students',
        loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'learning',
        loadChildren: () => import('./pages/my-learning/my-learning.module').then(m => m.MyLearningModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'app-pages',
        loadChildren: () => import('./pages/app-pages/app-pages.module').then(m => m.AppPagesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'contact-forms',
        loadChildren: () => import('./pages/contact-forms/contact-forms.module').then(m => m.ContactFormsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'exam-paper',
        loadChildren: () => import('./pages/exam-paper/exam-paper.module').then(m => m.ExamPaperModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-learning',
        loadChildren: () => import('./pages/manage-learning/manage-learning.module').then(m => m.ManageLearningModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'stats',
        loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'user-profile',
        loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    },
    canActivate: [SetupAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    },
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then(m => m.ForgotModule),
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      relativeLinkResolution: 'legacy',
      useHash: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
