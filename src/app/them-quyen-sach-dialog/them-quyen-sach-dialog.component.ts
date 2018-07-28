import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-them-quyen-sach-dialog',
  templateUrl: './them-quyen-sach-dialog.component.html',
  styleUrls: ['./them-quyen-sach-dialog.component.css']
})
export class ThemQuyenSachDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ThemQuyenSachDialogComponent>,private firebaseService:FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  themSoLuong(gia,soLuong){
    if(gia!=""&&soLuong!=""){
    this.firebaseService.themSoLuongSach(this.data.id, soLuong, gia);
    this.dialogRef.close();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
