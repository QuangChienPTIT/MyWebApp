import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from '../../../node_modules/rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AngularFireAuthModule } from '../../../node_modules/angularfire2/auth';
import { MatDialog } from '../../../node_modules/@angular/material';
import { ThemQuyenSachDialogComponent } from '../them-quyen-sach-dialog/them-quyen-sach-dialog.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';



@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id: any;
  book: Observable<any>;
  comments: any[];
  animal: string;
  name: string;
  sachMuon: any[] = [];
  tongSoLuong;
  soLuongConLai;
  constructor(private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireAuthModule,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.book = this.firebaseService.getBookDetails(this.id);
    this.getTongSoLuong();
  }

  getTongSoLuong() {
    this.firebaseService.getAllQuyenSachByBook(this.id).subscribe(keys => {
      this.tongSoLuong = keys.length;
      keys.forEach(key => {
        // this.sachMuon.push(key.key);        
        this.firebaseService.getSachMuonByQuyenSach(key.key).subscribe(data => {
          for (var i = 0; i < this.sachMuon.length; i++) {
            if (this.sachMuon[i] === key.key) this.sachMuon.splice(i, 1);
          }
          var khaDung = true;
          // data.forEach(element => {
          //   var x = element.payload.val();
          //   var a = x['ngayDangKy'];
          //   var b = x['ngayMuon'];
          //   var c = x['ngayTra'];
          //   if(c==null) {
          //     // this.sachMuon.forEach( (item, index) => {
          //     //   if(item === x['idQuyenSach']) this.sachMuon.splice(index,1);
          //     //   return ;
          //     // });                      
          //     for(var i =0;i<this.sachMuon.length;i++){
          //       if(this.sachMuon[i]===x['idQuyenSach']) this.sachMuon.splice(i,1);                
          //     }
          //     khaDung = false;   
          //     return false;              
          //   }

          for (var i = 0; i < data.length; i++) {
            if (data[i].payload.val()['ngayTra'] == null) {
              for (var i = 0; i < this.sachMuon.length; i++) {
                if (this.sachMuon[i] === key.key) this.sachMuon.splice(i, 1);
              }
              khaDung = false;
              break;
            }
          }
          if (khaDung) {
            this.sachMuon.push(key.key);
          }




          //nếu chưa trả thì c ==null=> số lượng còn lại --;
        // });
      })
    })

  });
}

openDialog(): void {
  // this.firebaseService.themSoLuongSach(this.id, 1, 10000);
  const dialogRef = this.dialog.open(ThemQuyenSachDialogComponent, {
    width: '400px',
    data: {
      id: this.id
    }
  });
}

openDialogEdit(){
  const dialogRef = this.dialog.open(EditBookDialogComponent, {
    width: '900px',
    data: {
      id: this.id
    }
  });
}

onTabClick(event: MatTabChangeEvent) {
  if (event.index === 1) {
    this.firebaseService.getComments(this.id).subscribe(item => {
      this.comments = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x['id'] = element.key;
        x['userName'] = this.firebaseService.getUserName(x['idUser']);
        x['imgURL'] = this.firebaseService.getUserIMG(x['idUser']);
        //this.sachMuons.push(x);
        this.comments.push(x);
      });
    });
  }
}
deleteComment(idComment: number) {
  this.firebaseService.deleteComment(idComment, this.id);
}

}

