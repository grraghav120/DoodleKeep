import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.css'],
})
export class ShowContentComponent implements OnInit {
  cardShow: any = [];
  priorities:any=['Low','Medium','High'];
  isLoading: boolean = false;
  isAccess: boolean = true;
  title: string = '';
  content: string = '';
  allData: any = [];
  isUndo: boolean=false;
  constructor(
    private data: DataService,
    private route: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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
          this.allData = this.cardShow;
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
    const dialogRef =this.dialog.open(AlertComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if(result===true){
        const index=this.cardShow.findIndex((x:any)=> x.id===id);
        this.cardShow.splice(index,1);
        console.log(this.cardShow);
        this.openSnackBarDelete('Task Deleted', 'UNDO', 4000, id);
      }
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

  openSnackBarDelete(message: string, action: string, time: number,id:string) {
    let snackRef=this._snackBar.open(message, action, { duration: time });
    snackRef.onAction().subscribe(()=>{
      this.isUndo=true;
      this.onFetchData();
    });

    snackRef.afterDismissed().subscribe(()=>{
      if(!this.isUndo){
        this.data.onDeleteTask(id).subscribe(() => {
          console.log("delete item successfully");
        });
      }
    })

  }

  onNewUser() {
    this.route.navigate(['welcome']);
  }

  applyFilter(event: Event) {
    // console.log(event);
    var filterValue = (event.target as HTMLInputElement).value;
    filterValue=filterValue.trim().toLocaleLowerCase();
    // console.log(filterValue);
    this.cardShow = this.allData.filter((x: any) =>
      this.search(x, filterValue)
    );
  }

  search(x: any, filterValue: any) {
    if (x.title.toLowerCase().includes(filterValue)) return x;
    if (x.content.toLowerCase().includes(filterValue)) return x;
  }

  onSelect(value: any) {
    if (value !== 'None') {
      this.cardShow = this.allData.filter((x: any) => x.priority === value);
    } else this.cardShow = this.allData;
  }
}
