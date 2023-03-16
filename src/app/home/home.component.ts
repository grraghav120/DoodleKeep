import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../welcome/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private route:Router,private auth:AuthService,private data:DataService){}

  ngOnInit(): void {
    
  }
  onAddTask(){
    this.data.isEdit=false;
    if(this.auth.isAccess===true) this.route.navigate(['notes/add']);
    else this.route.navigate(['welcome'])
  }
}
