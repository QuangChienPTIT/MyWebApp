import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from '../environments/environment';

import 'hammerjs';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NhapsachComponent } from './nhapsach/nhapsach.component';
import { XemsachComponent } from './xemsach/xemsach.component';
import { NavbarComponent } from './navbar/navbar.component';

//services
import {FirebaseService} from './services/firebase.service'

//Routes
import { Routes, RouterModule } from '../../node_modules/@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
const appRoutes:Routes =[
  {path:'',component:AppComponent},
  {path:'home',component:HomeComponent},
  {path:'books',component:BooksComponent},
  {path:'addbook',component:NhapsachComponent},
  {path:'book/:id',component:BookDetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NhapsachComponent,
    XemsachComponent,
    NavbarComponent,
    HomeComponent,
    BooksComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatButtonToggleModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase,'QCThuVien'),
    AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
  ],
  providers:[FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
