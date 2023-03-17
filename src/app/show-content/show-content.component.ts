import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  priorities:any=['None','Low','Medium','High'];
  isAccess: boolean = true;
  title: string = '';
  content: string = '';
  allData: any=[];
  constructor(
    private data: DataService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cardShow = [];
    this.onFetchData();
  }

  onFetchData() {
    this.isLoading = true;
    this.data.cards = [];
    this.cardShow = [];
    this.data.onFetchData().subscribe(
      (res: any) => {
        this.isLoading = false;
        if (res) {
          Object.keys(res).forEach((x) =>
            this.data.cards.push({
              id: x,
              title: res[x].title,
              content: res[x].content,
              priority: res[x].priority,
            })
          );
          this.cardShow = this.data.cards;
          this.allData=this.cardShow;
        } else {
          console.log('Error in Fetch API');
        }
      },
      (error) => {
        console.log(error);
        this.isAccess = false;
        this.openSnackBar(error.error.error, 'X', 2000);
      }
    );
  }

  onDeleteTask(id: string) {
    this.data.onDeleteTask(id).subscribe(() => {
      this.onFetchData();
      this.openSnackBar('Task Deleted', 'X', 3000);
    });
  }

  onEditTask(id: string) {
    this.data.onEditTask(id);
    this.route.navigate(['notes/edit']);
  }

  getColor(btn: string) {
    if (btn === 'High') return 'warn';
    else if (btn === 'Low') return '.';
    else return 'primary';
  }

  openSnackBar(message: string, action: string, time: number) {
    this._snackBar.open(message, action, { duration: time });
  }

  onNewUser() {
    this.route.navigate(['welcome']);
  }

   applyFilter(event: Event) {
    console.log(event);
    console.log(this.cardShow);
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.cardShow.filter = filterValue.trim().toLowerCase();
  }
  
  onSelect(value:any){
    if(value!=='None'){
      this.cardShow=this.allData.filter((x:any)=>x.priority===value);
    }
    else this.cardShow=this.allData;
  }
}
