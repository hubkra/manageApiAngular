import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.module';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService:WebRequestService) { }

  createList(title:string){
    return this.webReqService.post('lists',{title});  
  }

  updateList(listId:string, title: string){
    return this.webReqService.patch(`lists/${listId}`,{title});  
  }
  updateTask(listId: string, taskId: string, title: string) {
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }
  
  createTask(title:string,listId:string){
    return this.webReqService.post(`lists/${listId}/tasks`,{title});  
  }

  getLists() {
    return this.webReqService.get('lists');
  }

  getTasks(lsitId:string) {
    return this.webReqService.get(`lists/${lsitId}/tasks`);
  }

  complete(task:Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed,
    })
}
  deleteList(id:string) {
  return this.webReqService.delete(`lists/${id}`)
}

  deleteTask(listId:string,taskId:string) {
  return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`)
}

}
