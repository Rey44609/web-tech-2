import { Routes } from '@angular/router';
import {  ActivityComponent } from './activity/activity-1.component';
import { PrelimExamComponent } from './prelim-exam/prelim-exam.component';


export const routes: Routes = [
    {
        path: 'activity-1',
        component: ActivityComponent},

        {
          path: 'prelim-exam',
          component: PrelimExamComponent
        }


 
];