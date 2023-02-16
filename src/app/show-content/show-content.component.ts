import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.css'],
})
export class ShowContentComponent implements OnInit {
  cardShow: any = [];
  isLoading: boolean = false;
  title: string = '';
  content: string = '';
  constructor(private data: DataService, private route: Router) {}
  ngOnInit(): void {
    this.cardShow=[];
    this.onFetchData();
  }

  onFetchData() {
    this.isLoading = true;
    this.data.cards = [];
    this.cardShow=[];
    this.data.onFetchData().subscribe((res: any) => {
      this.isLoading = false;
      if (res) {
        Object.keys(res).forEach((x) =>
          this.data.cards.push({
            id: x,
            title: res[x].title,
            content: res[x].content,
            priority:res[x].priority,
          })
        );
        this.cardShow = this.data.cards;
      } else {
        console.log('Error in Fetch API');
      }
    },
    error=>{
      console.log(error);
      
    }
    );
  }

  onDeleteTask(id: string) {
    this.data.onDeleteTask(id).subscribe(() => {
      this.onFetchData();
    });
  }

  getColor(btn:string){
    if(btn==='High') return "warn"
    else if(btn==='Low') return "."
    else return "primary"
  }
}
