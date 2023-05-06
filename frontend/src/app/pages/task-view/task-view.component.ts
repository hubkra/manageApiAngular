import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import {switchMap} from 'rxjs/operators';
import { List } from 'src/app/models/list.module';
import { Task } from 'src/app/models/task.module';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists!: List[];
  tasks?: Task[];

  selectedListId!:string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
    
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(()=>{
      //the task has been successfully completed
      task.completed = !task.completed;
    })
  }

  onDeleteListClick(){
    this.taskService.deleteList(this.selectedListId).subscribe((response:any)=>{
      this.router.navigate(['/lists']);
      console.log(response);
    });
  }

  onTaskDeleteClick(id:string){
    this.taskService.deleteTask(this.selectedListId,id).subscribe((response:any)=>{
      this.tasks = this.tasks?.filter(val => val._id !== id);
      console.log(response);
    });
  }

  }

  

