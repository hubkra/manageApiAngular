import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.module';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent {
  
  
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((list: any) => {
      console.log(list);
      const newList: List = list;
      this.router.navigate([ '/lists', newList._id ]);
    });
  }
  

}

