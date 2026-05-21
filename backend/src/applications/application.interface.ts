export interface Application {
  id?: string;

  jobId: string;

  applicantId: string;

  recruiterId: string;

  status: 'pending' | 'accepted' | 'rejected';

  createdAt?: Date;
}