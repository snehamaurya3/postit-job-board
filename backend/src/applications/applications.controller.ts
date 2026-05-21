import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApplicationsService } from './applications.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { ApplyJobDto } from './dto/apply-job.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private applicationsService: ApplicationsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  applyToJob(
    @Body() applyJobDto: ApplyJobDto,
    @Req() req: any,
  ) {
    return this.applicationsService.applyToJob(
      applyJobDto.jobId,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-applications')
  getMyApplications(@Req() req: any) {
    return this.applicationsService.getMyApplications(
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('job-applicants')
  getJobApplicants(@Req() req: any) {
    return this.applicationsService.getJobApplicants(
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.applicationsService.updateApplicationStatus(
      id,
      updateStatusDto.status,
    );
  }
}