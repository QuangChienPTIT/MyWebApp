import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-top-follower',
  templateUrl: './top-follower.component.html',
  styleUrls: ['./top-follower.component.css']
})
export class TopFollowerComponent implements OnInit {
  books: Observable<any[]>;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.books=this.firebaseService.getBooks();
  }

}
