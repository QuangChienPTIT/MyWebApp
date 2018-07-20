import { Component, OnInit } from '@angular/core';
import { Book } from '../models/Book';

@Component({
  selector: 'app-nhapsach',
  templateUrl: './nhapsach.component.html',
  styleUrls: ['./nhapsach.component.css']
})
export class NhapsachComponent implements OnInit {
  book: Book = new Book();
  ngOnInit() {
  }
  nhapSach(name: String){
    this.book.name = name;
    
  }
}

