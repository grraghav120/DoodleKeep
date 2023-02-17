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

  getId(id:string,id2:string){
    this.userToken=id;
    this.welcomeId=id2;
  }

  onSendRequest(values:any){
    return this.http.post('https://ng-angular-project-1adbc-default-rtdb.firebaseio.com/'+this.welcomeId+'.json?auth='+this.userToken,values)
  }

  onFetchData(){
    return this.http.get('https://ng-angular-project-1adbc-default-rtdb.firebaseio.com/'+this.welcomeId+'.json?auth='+this.userToken);
  }

  onDeleteTask(id:string){
    return this.http.delete('https://ng-angular-project-1adbc-default-rtdb.firebaseio.com/'+this.welcomeId+'/'+id+'.json?auth='+this.userToken);
  }

}
