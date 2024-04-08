import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  showModal = false;

  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    priority: '',
    status: ''
  };
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.taskService.addTask(this.task);
    // Reset form fields
    this.task = {
      id: 0,
      title: '',
      description: '',
      dueDate: new Date(),
      priority: '',
      status: ''
    };
    // Close modal
    document.getElementById('closeModalButton')?.click();
    const modal = document.getElementById('taskFormModal');
    modal?.classList.remove('show');
  }

  editTask(index: number): void {
    const editedIndex: Task = { ...this.task };
    this.taskService.updateTask(index, editedIndex);
    //this.getTasksList();

   
  }

}
