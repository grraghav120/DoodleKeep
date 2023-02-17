import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cards:any=[];
  welcomeId:any;
  userToken:string='';
  constructor(private http:HttpClient) { }

  getId(id:string){
    this.userToken=id;
  }

  onSendRequest(values:any){
    return this.http.post('https://ng-angular-project-1adbc-default-rtdb.firebaseio.com/notes.json?auth='+this.userToken,values)
  }

  onFetchData(){
    return this.http.get('https://ng-angular-project-1adbc-default-rtdb.firebaseio.com/notes.json?auth='+this.userToken);
  }

  onDeleteTask(id:string){
    return this.http.delete('https://ng-angular-project-1adbc-default-rtdb.firebaseio.com/notes/'+id+'.json?auth='+this.userToken);
  }

}
