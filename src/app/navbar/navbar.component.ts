import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { EventEmitter } from "events";
import { Router } from "@angular/router";
import { MatDialog } from '../../../node_modules/@angular/material/dialog';
import { LoginRegisterDialogComponent } from '../account/login-register-dialog/login-register-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  authenticated: boolean = false;
  constructor(public dialog: MatDialog,public af:AngularFireAuth) {
    
   }

  ngOnInit() {
  }

  login(){
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.authenticated=true;
  }

  logout(){
    this.af.auth.signOut();
    this.authenticated=false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginRegisterDialogComponent, {
      width: '400px',
    });
  }
}
