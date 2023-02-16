import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from './auth.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  welcomeForm!: FormGroup;
  msg: any;
  constructor(
    private route: Router,
    private data: DataService,
    private auth: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.welcomeForm = new FormGroup({
      emailAdd: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onWelcome() {
    this.auth.onSignUp(this.welcomeForm.value).subscribe(
      (res: any) => {
        if (res) {
          this.route.navigate(['notes']);
        }
      },
      (error) => {
        this.msg=error.error.error.message;
        console.log(error.error.error.message);
        this.openSnackBar(this.msg,"X");
      }
    );
    this.welcomeForm.reset();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}