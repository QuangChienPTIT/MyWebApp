import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { map } from '../../../node_modules/rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-tai-khoan-khoa',
  templateUrl: './tai-khoan-khoa.component.html',
  styleUrls: ['./tai-khoan-khoa.component.css']
})
export class TaiKhoanKhoaComponent implements OnInit {

  users: Observable<any[]>;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.users = this.firebaseService.getUserBlocked().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  moKhoa(idUser){
    this.firebaseService.moKhoaTaiKhoan(idUser);
  }
}
