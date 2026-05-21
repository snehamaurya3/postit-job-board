import { IsNotEmpty } from 'class-validator';

export class ApplyJobDto {
  @IsNotEmpty()
  jobId!: string;
}