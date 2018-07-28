import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { MatDialog } from '../../../node_modules/@angular/material/dialog';
import { TraSachDialogComponent } from '../tra-sach-dialog/tra-sach-dialog.component';

@Component({
  selector: 'app-sach-qua-han',
  templateUrl: './sach-qua-han.component.html',
  styleUrls: ['./sach-qua-han.component.css']
})
export class SachQuaHanComponent implements OnInit {
  dataNow: Date = new Date();
  dateNowMilliseconds=this.dataNow.getTime();
  sachMuons: any[];
  idQuyenSach: any[] = [];
  bookName: any[] = [];
  sachtam: any[];
  days;
  constructor(private firebaseService: FirebaseService, private db: AngularFireDatabase,public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getList();

  }
  getList(){

      this.firebaseService.getListSachMuon().subscribe(item => {
        this.sachMuons = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x['id']=element.key;
          if (x['ngayTra'] == null &&x['ngayMuon']!=null) {
            x['userName'] = this.firebaseService.getUserName(x['idUser']);
            //this.sachMuons.push(x);
            this.db.database.ref('Book').orderByChild("QuyenSach/" + x['idQuyenSach'] + '/tinhTrang').startAt(1).on('child_added', (data) => {
              //console.log(data.val().name);
              x['bookName'] = data.val().name;
              x['imgURL'] = data.val().imgURL;
              x['idBook'] = data.key;
              var ngayMuon = +x['ngayMuon'];
              x['days'] = Math.floor((this.dateNowMilliseconds -ngayMuon)/(24*60*60*1000));
              if(x['days']>7)
                this.sachMuons.push(x);
              
            });
          }
        });
      })
  }
  khoaTaiKhoan(){
    for (let i of this.sachMuons) {
      this.firebaseService.khoaTaiKhoan(i['idUser']);
    }
  }




}