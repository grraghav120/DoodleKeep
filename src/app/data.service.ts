import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cards:any=[];
  welcomeId:any;
  constructor(private http:HttpClient) { }

  onSendRequest(values:any){
    return this.http.post('https://ng-angular-project-1adbc-default-rtdb.firebaseio.com/'+this.welcomeId+'.json',values)
  }

  onFetchData(){
    return this.http.get('https://ng-angular-project-1adbc-default-rtdb.firebaseio.com/notes.json');
  }

  onDeleteTask(id:string){
    return this.http.delete('https://ng-angular-project-1adbc-default-rtdb.firebaseio.com/'+this.welcomeId+'/'+id+'.json');
  }

}
