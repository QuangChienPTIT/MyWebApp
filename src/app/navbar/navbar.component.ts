import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { EventEmitter } from "events";
import { Router } from "@angular/router";
import { MatDialog } from '../../../node_modules/@angular/material/dialog';
import { LoginRegisterDialogComponent } from '../account/login-register-dialog/login-register-dialog.component';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog,public authService:AuthService) {
      

   }

  ngOnInit() {
  }


  logout(){
    this.authService.logout();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginRegisterDialogComponent, {
      width: '700px',
    });
  }
}
