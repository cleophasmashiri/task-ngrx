import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Task } from './../model/task';

@Injectable()
export class TasksService {

  // in case you have an API
  private readonly API_TASKS_URL = `http://localhost:3001/tasks`;

  private COUNT = 3;

  private tasks: Task[] = [
    { id: '1', title: 'Task 01', completed: false },
    { id: '2', title: 'Task 02', completed: true },
    { id: '3', title: 'Task 03', completed: false }
  ];

  constructor(private http: HttpClient) { }

  load() {
    // return this.http.get<Task[]>(this.API_TASKS_URL);
    return Observable.of(this.tasks);
  }

  create(record: Task) {
    // return this.http.post<Task>(this.API_TASKS_URL, record);
    record.id = `${++this.COUNT}`;
    this.tasks.push(record);
    return Observable.of(record);
  }

  update(record: Task) {
    // return this.http.put<Task>(`${this.API_TASKS_URL}/${record.id}`, record);
    this.tasks = this.tasks.map((task: Task) => {
      return task.id === record.id ? record : task;
    });
    return Observable.of(record);
  }

  remove(id: string) {
    // return this.http.delete<Task>(`${this.API_TASKS_URL}/${id}`);
    this.tasks = this.tasks.filter((task: Task) => {
      return task.id !== id;
    });
    return Observable.of(id);
  }
}