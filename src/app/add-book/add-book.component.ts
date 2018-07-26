import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { async } from '../../../node_modules/rxjs/internal/scheduler/async';
import {FormControl} from '@angular/forms';
import { MatDialog } from '../../../node_modules/@angular/material/dialog';
import { AddAuthorDialogComponent } from '../add-author-dialog/add-author-dialog.component';
import { LoginRegisterDialogComponent } from '../account/login-register-dialog/login-register-dialog.component';
import { AddTypeDialogComponent } from '../add-type-dialog/add-type-dialog.component';

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
  constructor(private firebaseService: FirebaseService,private storage: AngularFireStorage,private router:Router,public dialog: MatDialog) { }

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

  openDialogAddAuthor(): void {
    const dialogRef = this.dialog.open(AddAuthorDialogComponent, {
      width: '700px',
    });
  }
  openDialogAddType(): void {
    const dialogRef = this.dialog.open(AddTypeDialogComponent, {
      width: '700px',
    });
  }
}
