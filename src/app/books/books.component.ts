import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList  } from 'angularfire2/database'
import { Book } from '../models/Book'
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Observable<any[]>;
  listBook: Book[];
  constructor(private firebaseService: FirebaseService,private db:AngularFireDatabase) { 
    db.database.ref('Book').on('child_added', function(snapshot){
      // this.listBook = snapshot.val();
      console.log(snapshot.val())
    });
  }

  ngOnInit() {
    this.books=this.firebaseService.getBooks();
    
}

}