import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { StudentsService } from '../../services/students/students.service';
import { StudentRefreshService } from '../../services/student-refresh.service';
import { GetStudent } from '../../models/student.model';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
  private readonly studentsService = inject(StudentsService);
  private readonly router = inject(Router);
  private readonly refreshService = inject(StudentRefreshService);
  private destroy$ = new Subject<void>();

  studentsList: GetStudent[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    console.log('[StudentsComponent] Component initialized');
    this.loadStudents();
    
    // Subscribe to refresh signal from create-student
    this.refreshService.refresh$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('[StudentsComponent] Refresh signal received, reloading...');
        this.loadStudents();
      });

    // Also watch for route navigation to /students
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter(event => (event as NavigationEnd).url === '/students'),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('[StudentsComponent] Navigated to /students');
        this.loadStudents();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  students() {
    return this.studentsList;
  }

  async loadStudents() {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      console.log('[StudentsComponent] Fetching students from API...');
      const data = await this.studentsService.getStudents();
      console.log('[StudentsComponent] Students received:', data);
      this.studentsList = data || [];
    } catch (err: any) {
      console.error('[StudentsComponent] Error loading students:', err);
      this.errorMessage = `Failed to load students: ${err?.message || 'Unknown error'}`;
      this.studentsList = [];
    } finally {
      this.isLoading = false;
    }
  }

  async deleteStudent(id: string | number) {
    try {
      await this.studentsService.deleteStudent(String(id));
      this.studentsList = this.studentsList.filter(student => student.id !== id);
    } catch (error) {
      console.error('Failed to delete student', error);
    }
  }
}
