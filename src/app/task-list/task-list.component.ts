import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskForm: FormGroup;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filteredPriority: Task[] = [];
  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    priority: '',
    status: ''
  };

  constructor(private taskService: TaskService, private formBuilder: FormBuilder) { 

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTasksList();
  }

  // get list of tasks
  getTasksList(){
    this.tasks = this.taskService.getTasks();
  }

 openModal(index: number){
  const modal = document.getElementById('taskFormModal');
  modal?.classList.add('show');
  const taskToEdit = this.tasks[index];
  this.task = { ...taskToEdit };
 }  

  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.getTasksList();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
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

    //this.toastr.success('Task has been saved successfully', 'Success');
    // Close modal
   this.closeModal();
   }
   else{
    //this.toastr.error('Oops!, Please input details in correct format', 'Error');
    console.log('Please input details in correct format');
   }
  }

  editTask(index: number): void {
    const editedIndex: Task = { ...this.task };
    this.taskService.updateTask(index, editedIndex);
    //this.toastr.success('Task has been saved successfully', 'Success');
    this.getTasksList();
    this.closeModal();
  }

  closeModal(){
    const modal = document.getElementById('taskFormModal');
    modal?.classList.remove('show');

    this.clearForm();
  }

  clearForm(): void {
    this.task = { id: 0, title: '', description: '', dueDate: new Date(), priority: '', status: '' };
  }

   filterByPriority(priority: string): void {
    this.filteredPriority = this.tasks.filter(task => task.priority === priority);
    console.log('Filter by priority:', filteredPriority);
  }

  filterByStatus(status: string): void {
    this.filteredTasks = this.tasks.filter(task => task.status === status);
    console.log('Filter by status:', filteredTasks);
  }

}
