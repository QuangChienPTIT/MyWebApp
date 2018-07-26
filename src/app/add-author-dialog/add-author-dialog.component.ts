import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../node_modules/@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-add-author-dialog',
  templateUrl: './add-author-dialog.component.html',
  styleUrls: ['./add-author-dialog.component.css']
})
export class AddAuthorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddAuthorDialogComponent>,private firebasaService:FirebaseService) { }

  ngOnInit() {
  }

  addAuthor(authorName,description){
    this.firebasaService.addAuthor(authorName,description);
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
