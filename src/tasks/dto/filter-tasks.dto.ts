import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class FilterTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
