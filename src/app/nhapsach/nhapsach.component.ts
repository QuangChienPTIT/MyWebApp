import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Book } from '../models/Book';

@Component({
  selector: 'app-nhapsach',
  templateUrl: './nhapsach.component.html',
  styleUrls: ['./nhapsach.component.css']
})
export class NhapsachComponent implements OnInit {


  constructor(db: AngularFireDatabase) {
    
  }
  
  book: Book = new Book();
  ngOnInit() {
  }
  nhapSach(name: String){
    this.book.name = name;
    
  }
}

