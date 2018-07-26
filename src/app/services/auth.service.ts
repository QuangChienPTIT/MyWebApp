import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { Observable } from '../../../node_modules/rxjs';
import { auth } from '../../../node_modules/firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  user: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
      this.user=this.afAuth.authState;        
  }

  getUser(){
    return this.user;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    })
  }

  emailLogin(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("this is uid"+auth.user.uid);
        this.db.object('User/'+auth.user.uid+'/role').valueChanges().subscribe(role=>{
          if(role!='admin') {
            this.afAuth.auth.signOut();
            alert('tai khoan không hợp lệ');
          }

        });
      })
      .catch(error => alert(error));
      
 }





  logout() {
    this.afAuth.auth.signOut();
  }

}
