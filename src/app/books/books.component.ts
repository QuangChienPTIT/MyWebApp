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
  constructor(private firebaseService: FirebaseService,private authService:AuthService,private db:AngularFireDatabase) {
  }

  ngOnInit() {
    this.books = this.firebaseService.getBooks();
  }

  searchAction(searchString){
    this.books=this.firebaseService.searchBookByName(searchString);
    
  }

}
