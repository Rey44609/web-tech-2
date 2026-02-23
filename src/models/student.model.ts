// src/models/student.model.ts

export interface GetStudent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number | null;
  course: string | null;
  year_level: number | null;
  gpa: number | null;
  enrollment_status: string;
  created_at: string;
}

export interface CreateStudentPayload {
  first_name: string;
  last_name: string;
  email: string;
  age?: number;
  course?: string | null;
  year_level?: number;
  gpa?: number;
  enrollment_status?: string;
}