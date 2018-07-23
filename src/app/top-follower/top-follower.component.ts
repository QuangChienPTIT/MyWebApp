import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from '../../../node_modules/rxjs';
import { AngularFireDatabase, AngularFireList } from '../../../node_modules/angularfire2/database';
import { Book } from '../models/Book';

@Component({
  selector: 'app-top-follower',
  templateUrl: './top-follower.component.html',
  styleUrls: ['./top-follower.component.css']
})
export class TopFollowerComponent implements OnInit {
  books: any[];
  constructor(private firebaseService: FirebaseService, private db: AngularFireDatabase) {
  }



  ngOnInit() {
    this.firebaseService.getBooks().subscribe(item => {
      this.books = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["key"] = element.key;
        this.firebaseService.getAuthorbyBook(element.key).subscribe(item => {
          item.forEach(element => {
            x["authorName"] = this.db.object('Author/' + element.key + '/name').valueChanges();
          })
        })
        this.books.push(x);
      });
      for (let book of this.books) {
        console.log(book);
      }
    });



  }

}
function getdata(snapshot) {
  var book;
  book = snapshot.val().name;
}
