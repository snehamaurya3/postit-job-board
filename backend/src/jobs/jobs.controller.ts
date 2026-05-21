import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';

import { JobsService } from './jobs.service';

import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
@UseGuards(JwtAuthGuard)
@Post()
createJob(
  @Body() createJobDto: CreateJobDto,
  @Req() req: any,
) {

  console.log('BODY:', createJobDto)
  console.log('USER:', req.user)

  return this.jobsService.createJob(
    createJobDto,
    req.user.userId,
  )
}

@Get()
getAllJobs(
  @Query('search') search?: string,
) {

  return this.jobsService.getAllJobs(
    search,
  )
}

  @Get(':id')
  getJobById(@Param('id') id: string) {
    return this.jobsService.getJobById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateJob(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Req() req: any,
  ) {
    return this.jobsService.updateJob(
      id,
      updateJobDto,
      req.user.userId,
      // req.user.sub
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteJob(
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.jobsService.deleteJob(
      id,
      // req.user.sub,
      req.user.userId,
      
    );
  }
}