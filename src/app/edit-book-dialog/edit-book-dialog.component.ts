import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../../node_modules/@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.css']
})
export class EditBookDialogComponent implements OnInit {
  name;
  description;
  imgURL;
  book: Observable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<EditBookDialogComponent>,private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.book=this.firebaseService.getBookById(this.data.id);
  }
  closeDialog(){
    this.dialogRef.close();
  }
  editBook(name,description,imgURL){
    this.firebaseService.editBook(this.data.id,name,description,imgURL);
    this.dialogRef.close();
  }
}
