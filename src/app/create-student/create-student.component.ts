import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  standalone: true,
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/students']);
  }
}