import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {ActivatedRoute,Router} from '@angular/router'
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id:any;
  bookDetails: Observable<any[]>;
  constructor(private firebaseService: FirebaseService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getBookDetails(this.id).subscribe(book =>{
      console.log('book detail:'+JSON.stringify(book));
    })
  }

}
