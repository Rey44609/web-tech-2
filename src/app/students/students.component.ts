// src/app/students/students.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentsService } from '../../services/students/students.service';
import { GetStudent } from '../../models/student.model';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  private readonly studentsService = inject(StudentsService);

  studentsList: GetStudent[] = [];

  constructor() {
    this.loadStudents();
  }

  students() {
    return this.studentsList;
  }

  async loadStudents() {
  try {
    const data = await this.studentsService.getStudents(); // await the promise
    this.studentsList = data;
  } catch (err) {
    console.error('Failed to load students', err);
  }
}

  async deleteStudent(id: string) {
    try {
      await this.studentsService.deleteStudent(id);
      this.studentsList = this.studentsList.filter(student => student.id !== id);
    } catch (error) {
      console.error('Failed to delete student', error);
    }
  }
}
