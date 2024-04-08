import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private localStorageKey = 'tasks';

    private tasks: Task[] = [];
      

  constructor() {
    this.loadTasksFromLocalStorage();

    if (this.tasks.length === 0) {
        this.addDefaultTasks();
      }
  }

  private loadTasksFromLocalStorage(): void {
    const storedTasks = localStorage.getItem(this.localStorageKey);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  private saveTasksToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
  }

  updateTask(index: number, task: Task): void {
    this.tasks[index] = task;
    this.saveTasksToLocalStorage();
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  
  private addDefaultTasks(): void {
    // Add some default tasks
    const defaultTasks: Task[] = [
      { id: 1, title: 'Default Task 1', description: 'Default Description 1', dueDate: new Date(), priority: 'Medium', status: 'Pending' },
      { id: 2, title: 'Default Task 2', description: 'Default Description 2', dueDate: new Date(), priority: 'Low', status: 'In Progress' }
    ];
    this.tasks = defaultTasks;
    this.saveTasksToLocalStorage();
  }
}
