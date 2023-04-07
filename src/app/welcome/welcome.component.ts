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
  hide:boolean=true;
  isLoging: boolean = false;
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
    if (this.isLoging) {
      this.auth.onLogin(this.welcomeForm.value).subscribe((res:any)=>{
        this.auth.isAccess=true;
        this.route.navigate(['notes']);
        this.data.getId(res.idToken,res.localId);
      },error=>{
        this.msg = error.error.error.message;
          // console.log(error.error.error.message);
          this.openSnackBar(this.msg, 'X');
      }
      )
    } else {
      this.auth.onSignUp(this.welcomeForm.value).subscribe(
        (res: any) => {
          if (res) {
            this.auth.isAccess=true;
            this.route.navigate(['notes']);
            this.data.getId(res.idToken,res.localId);
          }
        },
        (error) => {
          this.msg = error.error.error.message;
          // console.log(error.error.error.message);
          this.openSnackBar(this.msg, 'X');
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef=this._snackBar.open(message, action,{
      duration: 2000
    });
  }

  onSwitch() {
    this.isLoging = !this.isLoging;
  }
}
