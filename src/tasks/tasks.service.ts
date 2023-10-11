import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithDto(filterDto: FilterTasksDto): Task[] {
    const { status, search } = filterDto;

    let tpTasks = this.getAllTasks();

    if (status) {
      tpTasks = tpTasks.filter((task) => task.status === status);
    }

    if (search) {
      tpTasks = tpTasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tpTasks;
  }

  getTaskById(id: string) {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  updateTaskStatus(id: string, taskStatusDto: UpdateTaskStatusDto): Task {
    const task = this.getTaskById(id);
    task.status = taskStatusDto.status;
    return task;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
