import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { MatDialog } from '../../../node_modules/@angular/material/dialog';
import { TraSachDialogComponent } from '../tra-sach-dialog/tra-sach-dialog.component';


@Component({
  selector: 'app-sach-dang-muon',
  templateUrl: './sach-dang-muon.component.html',
  styleUrls: ['./sach-dang-muon.component.css']
})
export class SachDangMuonComponent implements OnInit {

  sachMuons: any[];
  idQuyenSach: any[] = [];
  bookName: any[] = [];
  sachtam: any[];
  constructor(private firebaseService: FirebaseService, private db: AngularFireDatabase,public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getList();

  }
  getList(){
    this.db.database.ref('SachMuon').on('child_added', snap => {

      this.firebaseService.getListSachMuon(snap.key).subscribe(item => {
        this.sachMuons = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x['id']=element.key;
          x['idUser']=snap.key;
          if (x['ngayTra'] == null &&x['ngayMuon']!=null) {
            x['userName'] = this.firebaseService.getUserName(x['idUser']);
            //this.sachMuons.push(x);
            this.db.database.ref('Book').orderByChild("QuyenSach/" + x['idQuyenSach'] + '/tinhTrang').startAt(1).on('child_added', (data) => {
              //console.log(data.val().name);
              x['bookName'] = data.val().name;
              x['imgURL'] = data.val().imgURL;
              x['idBook'] = data.key;
              this.sachMuons.push(x);
              for (let i of this.sachMuons) {
                console.log(i['bookName']);
              }
            });
          }
        });
      })
    })
  }
  // searchAction(searchString){
  //   console.log(searchString);
  //   this.getList();
  //   this.sachMuons = this.sachMuons.filter(function (sachmuon) { return sachmuon.idQuyenSach.includes(searchString); });
  // }

  traSach(id,idUser,idBook,idQuyenSach,bookName,imgURL,userName,ngayMuon){  
    
    // this.firebaseService.traSach(id,idUser)
    const dialogRef = this.dialog.open(TraSachDialogComponent, {
      width: '700px',
      data:{
        idUser:idUser,
        bookName: bookName,
        imgURL: imgURL,
        userName:userName,
        idQuyenSach:idQuyenSach,
        idBook:idBook,
        ngayMuon:ngayMuon,
        id: id
      }
    });

  }




}

