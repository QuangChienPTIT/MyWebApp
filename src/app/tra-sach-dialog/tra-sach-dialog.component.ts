import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { database } from '../../../node_modules/firebase';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
export interface TinhTrang {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-tra-sach-dialog',
  templateUrl: './tra-sach-dialog.component.html',
  styleUrls: ['./tra-sach-dialog.component.css']
})
export class TraSachDialogComponent implements OnInit {

  dataNow: Date = new Date();
  dateNowMilliseconds=this.dataNow.getTime();
  thongBao;
  thongBao1;
  thongBao2;
  tienPhat1=0;
  tienPhat2=0;
  tienPhat=0;
  days;
  tinhTrang;
  userName;
  selectedTinhTrang=1;
  
  tinhTrangs: TinhTrang[] = [
    { value: 1, viewValue: 'Tốt' },
    { value: 2, viewValue: 'Hư Hỏng Nhẹ' },
    { value: 3, viewValue: 'Hư Hỏng Nặng' }
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private firebaseService: FirebaseService, private db: AngularFireDatabase,
  public dialogRef: MatDialogRef<TraSachDialogComponent>) {
  }

  ngOnInit() {
    console.log(this.data);
    this.userName = this.firebaseService.getUserName(this.data.idUser);
    this.firebaseService.getGia(this.data.idBook, this.data.idQuyenSach).subscribe(value=>{
      this.data.gia = value;
    });
    this.firebaseService.getTinhTrangQuyenSach(this.data.idBook, this.data.idQuyenSach).subscribe(value => {
      this.data.tinhTrang = value;
      
      if (this.data.tinhTrang == 1) this.tinhTrang = 'Tốt';
      else if (this.data.tinhTrang == 2) this.tinhTrang = 'Hư hỏng nhẹ';
      else this.tinhTrang = 'Hư hỏng nặng'
      
    });
    this.kiemTraThoiGian();
    



  }

  kiemTraThoiGian(){
    this.days = Math.floor((this.dateNowMilliseconds - this.data.ngayMuon)/(24*60*60*1000));
    console.log("dayyyy   "+this.days);
    if(this.days>7){
      this.tienPhat1 = (this.days-7)*10000;
      this.thongBao1="Bị phạt "+this.tienPhat1+" đồng vì trả trễ " + (this.days-7)+ "ngày";
      
    }
    else this.thongBao1="Đã mượn : " + this.days + " ngày";
    console.log("selected tình trạng " + (this.selectedTinhTrang));
  }

  kiemtra(tinhTrang,gia){
    console.log("tinh trang "+ gia);
    var k = this.selectedTinhTrang-tinhTrang;
      if(k<0) {
        this.thongBao2="Tinh Trang không hợp lệ";
        this.thongBao="";
    }
      else if(k==0) {
        this.tienPhat = this.tienPhat2=0;
        this.thongBao2="";
        this.thongBao="";
      }
      else {
        this.thongBao="";
        this.tienPhat2 = (k*gia/2);
        this.thongBao2="Bị phạt " + this.tienPhat2  + " đồng vì làm hư hại sách ("+(k*50)+"% giá sách)";
      }      
      if(this.tienPhat1+this.tienPhat2>0){
        this.tienPhat = this.tienPhat1+this.tienPhat2;
      this.thongBao = "Tổng cộng bị phạt "+this.tienPhat+ " đồng";
    }
  }

  traSach(id, idUser, tinhTrang,idBook,idQuyenSach,tienPhat){
    this.firebaseService.traSach(id, tinhTrang,idBook,idQuyenSach,tienPhat);
    this.dialogRef.close();
  }

}
