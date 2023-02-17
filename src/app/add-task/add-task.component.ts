import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { DataService } from '../data.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  myForm!: FormGroup; //! ye kyun use kiya kyunki bro jab ReactiveFormsModule use kiya n tab error aa gyi between the /matFormModule and ReactiveFormsModule
  constructor(
    private route: Router,
    private http: HttpClient,
    private data: DataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      priority:new FormControl('',Validators.required),
    });
  }

  onAddingTask() {
    this.data.onSendRequest(this.myForm.value).subscribe((res) => {
      if (res) {
        this.openSnackBar("Task Added","X");
        this.route.navigate(['notes']);
      } else {
        console.log('Error in Send API');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{duration:2000});
  }
}
