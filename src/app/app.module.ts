import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ShowContentComponent } from './show-content/show-content.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from './data.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthService } from './welcome/auth.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
// import { MatOptionSelectionChange } from '@angular/material/core';
const appRoutes: Routes = [
  { path: 'notes/add', component: AddTaskComponent },
  { path: 'notes', component: HomeComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', component: WelcomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ShowContentComponent,
    AddTaskComponent,
    HomeComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [DataService,AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
