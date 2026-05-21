import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ApplicationsService {
  constructor(
    private firebaseService: FirebaseService,
  ) {}

  // =========================
  // APPLY TO JOB
  // =========================

  async applyToJob(
    jobId: string,
    applicantId: string,
  ) {

    const jobDoc =
      await this.firebaseService.db
        .collection('jobs')
        .doc(jobId)
        .get();

    if (!jobDoc.exists) {
      throw new NotFoundException(
        'Job not found',
      );
    }

    const jobData: any = jobDoc.data();

    const existingApplication =
      await this.firebaseService.db
        .collection('applications')
        .where('jobId', '==', jobId)
        .where(
          'applicantId',
          '==',
          applicantId,
        )
        .get();

    if (!existingApplication.empty) {
      throw new BadRequestException(
        'You already applied to this job',
      );
    }

    const application = {
      jobId,
      applicantId,
      recruiterId:
        jobData.recruiterId,
      status: 'pending',
      createdAt: new Date(),
    };

    const docRef =
      await this.firebaseService.db
        .collection('applications')
        .add(application);

    return {
      id: docRef.id,
      ...application,
    };
  }

  // =========================
  // GET MY APPLICATIONS
  // =========================


  async getMyApplications(
  applicantId: string,
) {

  const snapshot =
    await this.firebaseService.db
      .collection('applications')
      .where(
        'applicantId',
        '==',
        applicantId,
      )
      .get()

  const applications: any[] = []

  for (const doc of snapshot.docs) {

    const appData: any = doc.data()

    const jobDoc =
      await this.firebaseService.db
        .collection('jobs')
        .doc(appData.jobId)
        .get()

    applications.push({
      id: doc.id,
      ...appData,

      job: jobDoc.exists
        ? {
            id: jobDoc.id,
            ...jobDoc.data(),
          }
        : null,
    })
  }

  return applications
}

  // =========================
  // GET JOB APPLICANTS
  // =========================

  async getJobApplicants(
    recruiterId: string,
  ) {

    // recruiter jobs
    const jobsSnapshot =
      await this.firebaseService.db
        .collection('jobs')
        .where(
          'recruiterId',
          '==',
          recruiterId,
        )
        .get();

    const recruiterJobIds =
      jobsSnapshot.docs.map(
        (doc) => doc.id,
      );

    if (
      recruiterJobIds.length === 0
    ) {
      return [];
    }

    // all applications
    const applicationsSnapshot =
      await this.firebaseService.db
        .collection('applications')
        .get();

    // FIXED TYPE ERROR HERE
    const applications: any[] = [];

    for (const doc of applicationsSnapshot.docs) {

      const appData: any =
        doc.data();

      // recruiter's job only
      if (
        recruiterJobIds.includes(
          appData.jobId,
        )
      ) {

        // fetch job
        const jobDoc =
          await this.firebaseService.db
            .collection('jobs')
            .doc(appData.jobId)
            .get();

        // fetch applicant
        const applicantDoc =
          await this.firebaseService.db
            .collection('users')
            .doc(appData.applicantId)
            .get();

        applications.push({
          id: doc.id,
          ...appData,

          job: jobDoc.exists
            ? {
                id: jobDoc.id,
                ...jobDoc.data(),
              }
            : null,

          applicant:
            applicantDoc.exists
              ? {
                  id: applicantDoc.id,
                  ...applicantDoc.data(),
                }
              : null,
        });
      }
    }

    return applications;
  }

  // =========================
  // UPDATE APPLICATION STATUS
  // =========================

  async updateApplicationStatus(
    applicationId: string,
    status: string,
  ) {

    const appRef =
      this.firebaseService.db
        .collection('applications')
        .doc(applicationId);

    const appDoc =
      await appRef.get();

    if (!appDoc.exists) {
      throw new NotFoundException(
        'Application not found',
      );
    }

    await appRef.update({
      status,
    });

    return {
      message:
        'Application status updated',
    };
  }
}