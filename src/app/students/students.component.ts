import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  students = [
    { name: 'Rey Maria', course: 'SBMA', year: '3rd Year' },
    { name: 'Carlo Patcho', course: 'NURSING', year: '2nd Year' },
    { name: 'Lizandro Yap', course: 'MEDTECH', year: '4th Year' }
  ];

  constructor(private router: Router) {}

  goToCreateStudent() {
    this.router.navigate(['/create-student']);
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }
}