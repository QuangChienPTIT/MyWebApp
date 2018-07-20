import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList  } from 'angularfire2/database'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  books: Observable<any[]>;
  sachMuon: Observable<any[]>;
  bookDetails: Observable<any[]>;

  constructor(private db:AngularFireDatabase) { }
  getBooks(){
    this.books = this.db.list('Book').valueChanges();
    return this.books;
  }
  getSachMuon(){
    this.sachMuon = this.db.list('SachMuon').valueChanges();
    return this.sachMuon;
  }
  getBookDetails(id){
    this.bookDetails = this.db.list('Book/'+id).valueChanges();
    return this.bookDetails;
  }
}
