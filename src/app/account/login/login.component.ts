import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../../node_modules/@angular/material/dialog';
import { LoginRegisterDialogComponent } from '../login-register-dialog/login-register-dialog.component';
import { FirebaseAuth } from '../../../../node_modules/angularfire2';
import { AngularFireAuth } from '../../../../node_modules/angularfire2/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user;

  constructor(public dialogRef: MatDialogRef<LoginRegisterDialogComponent>, private authService:AuthService) {


  }

  ngOnInit() {
  }
  login(email, password) {
    this.authService.emailLogin(email,password);
    this.dialogRef.close();

  }
}
