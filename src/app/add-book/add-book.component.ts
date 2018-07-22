import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { async } from '../../../node_modules/rxjs/internal/scheduler/async';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  imageSelected=null;
  uploadPercent: Observable<number>;
  downloadURL: Observable<String>;
  file;
  url: String;
  constructor(private firebaseService: FirebaseService,private storage: AngularFireStorage,private router:Router) { }

  authors: Observable<any[]>;
  theLoais: Observable<any[]>;
  myControl = new FormControl();
  idAuthors: string;
  idTheLoais: string;
  ngOnInit() {
    this.authors=this.firebaseService.getListAuthor();
    this.theLoais=this.firebaseService.getListTheLoai();
  }
  addNewBook(name: String,description: String,imgURL: String,soLuong,gia: number){  
    if(soLuong<10)
    this.firebaseService.addBook(name,description,imgURL,this.idAuthors,this.idTheLoais,soLuong,gia);
    for(let idauthor of this.idTheLoais){
      console.log(idauthor);
    }
    this.router.navigate(['books']);
  }
  
  onImageSelected(event){
    this.file = event.target.files[0];  
    const fileRef = this.storage.ref('ImageBooks/'+this.file.name);
    var task = fileRef.put(this.file);
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe();  
    // this.downloadURL.subscribe(v=>{
    //   this.url = v;
    // });
    // console.log(this.url);
  }
}
