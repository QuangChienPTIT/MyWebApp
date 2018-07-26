import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../node_modules/@angular/material/dialog';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-add-type-dialog',
  templateUrl: './add-type-dialog.component.html',
  styleUrls: ['./add-type-dialog.component.css']
})
export class AddTypeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTypeDialogComponent>,private firebasaService:FirebaseService) { }

  ngOnInit() {
  }
  addAuthor(authorName,description){
    this.firebasaService.addAuthor(authorName,description);
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addType(typeName,description){
    this.firebasaService.addType(typeName,description);
    this.dialogRef.close();
  }
}
