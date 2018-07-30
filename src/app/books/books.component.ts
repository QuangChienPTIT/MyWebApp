import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Book } from '../models/Book'
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  searchString = '';
  books: Observable<any[]>;
  dataNow: Date = new Date();
  dateNowMilliseconds=this.dataNow.getTime();
  constructor(private firebaseService: FirebaseService,private authService:AuthService,private db:AngularFireDatabase) {
  }

  ngOnInit() {
    this.books = this.firebaseService.getBooks();
    this.loaiBoSachDangKyQuaHan();
  }

  searchAction(searchString){
    this.books=this.firebaseService.searchBookByName(searchString);    
  }
  loaiBoSachDangKyQuaHan(){
    this.firebaseService.getListSachMuon().subscribe(datas=>{
      datas.forEach(data=>{
        let a = +data.payload.val()['ngayDangKy'];
        let b =  this.dateNowMilliseconds;
        let c = (b-a)/(24*60*60*1000);
        if(c>7){
          console.log("Sach tre han : "+data.key+"   "+c);
          this.firebaseService.deleteSachMuon(data.key);
        }

      })
    })
  }

}
