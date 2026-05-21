export interface Job {
  id?: string;

  title: string;

  company: string;

  location: string;

  description: string;

  salary: string;

  category: string;

  recruiterId: string;

  createdAt?: Date;
}