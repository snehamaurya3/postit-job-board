import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private firebaseService: FirebaseService) {}

  async createJob(
  createJobDto: CreateJobDto,
  recruiterId: string,
) {

  try {

    console.log('Recruiter ID:', recruiterId)

    const job = {
      ...createJobDto,
      recruiterId,
      createdAt: new Date(),
    }

    console.log('JOB:', job)

    const docRef = await this.firebaseService.db
      .collection('jobs')
      .add(job)

    return {
      id: docRef.id,
      ...job,
    }

  } catch (error) {

    console.log(error)

    throw error
  }
}

async getAllJobs(search?: string) {

  const snapshot =
    await this.firebaseService.db
      .collection('jobs')
      .get()

  let jobs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  if (search) {

    const keyword =
      search.toLowerCase()

    jobs = jobs.filter((job: any) =>
      job.title
        ?.toLowerCase()
        .includes(keyword) ||

      job.companyName
        ?.toLowerCase()
        .includes(keyword) ||

      job.location
        ?.toLowerCase()
        .includes(keyword)
    )
  }

  return jobs
}

  async getJobById(id: string) {
    const doc = await this.firebaseService.db
      .collection('jobs')
      .doc(id)
      .get();

    if (!doc.exists) {
      throw new NotFoundException('Job not found');
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async updateJob(
    id: string,
    updateJobDto: UpdateJobDto,
    recruiterId: string,
  ) {
    const jobRef = this.firebaseService.db
      .collection('jobs')
      .doc(id);

    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) {
      throw new NotFoundException('Job not found');
    }

    const jobData: any = jobDoc.data();

    if (jobData.recruiterId !== recruiterId) {
      throw new ForbiddenException(
        'You can only update your own jobs',
      );
    }

    await jobRef.update(updateJobDto as any);

    return {
      message: 'Job updated successfully',
    };
  }

  async deleteJob(id: string, recruiterId: string) {
    const jobRef = this.firebaseService.db
      .collection('jobs')
      .doc(id);

    const jobDoc = await jobRef.get();

    if (!jobDoc.exists) {
      throw new NotFoundException('Job not found');
    }

    const jobData: any = jobDoc.data();

console.log(
  'TOKEN USER:',
  recruiterId,
);

console.log(
  'JOB RECRUITER:',
  jobData.recruiterId,
);

if (jobData.recruiterId !== recruiterId) {
  throw new ForbiddenException(
    'You can only delete your own jobs',
  );
}

    await jobRef.delete();

    return {
      message: 'Job deleted successfully',
    };
  }
}