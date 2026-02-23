// src/app/create-student/create-student.component.ts

import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { StudentsService } from "../../services/students/students.service";
import { StudentRefreshService } from "../../services/student-refresh.service";
import { CreateStudentPayload } from "../../models/student.model";

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent {

  private readonly studentsService = inject(StudentsService);
  private readonly router = inject(Router);
  private readonly refreshService = inject(StudentRefreshService);

  isLoading = false;
  errorMessage = '';

  student = {
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    course: '',
    yearLevel: '',
    gpa: '',
    status: 'Active'
  };

  async createStudent() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Validate required fields
      if (!this.student.firstName || !this.student.lastName || !this.student.email) {
        this.errorMessage = 'First Name, Last Name, and Email are required';
        this.isLoading = false;
        return;
      }

      const payload: CreateStudentPayload = {
        first_name: this.student.firstName,
        last_name: this.student.lastName,
        email: this.student.email,
        age: this.student.age !== '' ? Number(this.student.age) : undefined,
        course: this.student.course || undefined,
        year_level: this.student.yearLevel !== '' ? Number(this.student.yearLevel) : undefined,
        gpa: this.student.gpa !== '' ? Number(this.student.gpa) : undefined,
        enrollment_status: this.student.status || 'Active'
      };

      console.log('[Create Student] Student created successfully');
      await this.studentsService.createStudent(payload);
      
      // Navigate to students page
      console.log('[Create Student] Navigating to /students...');
      await this.router.navigate(['/students']);
      
      // Trigger refresh after navigation with delay to ensure component is ready
      setTimeout(() => {
        console.log('[Create Student] Emitting refresh signal...');
        this.refreshService.triggerRefresh();
      }, 800);
    } catch (error: any) {
      console.error('Failed to create student', error);
      this.errorMessage = error?.error?.message || error?.message || 'Failed to create student. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
