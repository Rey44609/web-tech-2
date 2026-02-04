import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prelim-exam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prelim-exam.component.html',
  styleUrls: ['./prelim-exam.component.scss']
})
export class PrelimExamComponent {

    public title: string = 'Prelim Exam Component';
}