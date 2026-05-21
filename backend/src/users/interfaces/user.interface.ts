export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: 'recruiter' | 'applicant';
  createdAt?: Date;
}