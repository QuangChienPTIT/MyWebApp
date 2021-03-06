import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { Subject } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-sach-muon',
  templateUrl: './sach-muon.component.html',
  styleUrls: ['./sach-muon.component.css']
})
export class SachMuonComponent implements OnInit {

  sachMuons: any[];
  idQuyenSach: any[]=[];
  bookName: any[]=[];
  
  constructor(private firebaseService: FirebaseService, private db: AngularFireDatabase) {

  }

  ngOnInit() {
    

      this.firebaseService.getListSachMuon().subscribe(item => {
        this.sachMuons = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x['id']=element.key;
          if(x['ngayTra'] == null && x['ngayMuon']==null){
          x['userName']=this.firebaseService.getUserName(x['idUser']);          
          //this.sachMuons.push(x);
          this.db.database.ref('Book').orderByChild("QuyenSach/"+x['idQuyenSach']+'/tinhTrang').startAt(1).on('child_added',(data)=>{
            //console.log(data.val().name);
            x['bookName']=data.val().name;
            x['imgURL']=data.val().imgURL;
            x['idBook']=data.key;
            this.sachMuons.push(x);
            for(let i of this.sachMuons){
              console.log(i['bookName']);
            }
          });
        }
        });

        // for (let book of this.sachMuons) {
        //   this.idQuyenSach.push(book.idQuyenSach);
        //   //console.log(book.idQuyenSach);
        // }
        // for(let a of this.idQuyenSach){
        //   this.db.database.ref('Book').orderByChild("QuyenSach/"+a+'/tinhTrang').startAt(1).on('child_added',(data)=>{
        //     console.log(data.val().name);
        //     this.bookName.push(data.val().name);
        //   });
        // }
        

      })

  }
  
  choMuonSach(id,idUser){
    
    console.log("Chay den day roi")
    this.firebaseService.choMuonSach(id)

  }

  searchAction(searchString){
    this.firebaseService.searchSachMuonByidUser(searchString).subscribe(item => {
      this.sachMuons = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x['id']=element.key;
        if(x['ngayTra'] == null && x['ngayMuon']==null){
        x['userName']=this.firebaseService.getUserName(x['idUser']);          
        //this.sachMuons.push(x);
        this.db.database.ref('Book').orderByChild("QuyenSach/"+x['idQuyenSach']+'/tinhTrang').startAt(1).on('child_added',(data)=>{
          //console.log(data.val().name);
          x['bookName']=data.val().name;
          x['imgURL']=data.val().imgURL;
          x['idBook']=data.key;
          this.sachMuons.push(x);
          for(let i of this.sachMuons){
            console.log(i['bookName']);
          }
        });
      }
      });
    });
  }

}
