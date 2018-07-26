import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from '../../../node_modules/rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AngularFireAuthModule } from '../../../node_modules/angularfire2/auth';
import { MatDialog } from '../../../node_modules/@angular/material';
import { ThemQuyenSachDialogComponent } from '../them-quyen-sach-dialog/them-quyen-sach-dialog.component';



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
  constructor(private firebaseService: FirebaseService,
     private router: Router, 
     private route: ActivatedRoute, 
     private db: AngularFireAuthModule,
     public dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // this.firebaseService.getBookDetails(this.id).subscribe(book =>{
    //   console.log('book detail:'+JSON.stringify(book));
    // })
    this.book = this.firebaseService.getBookDetails(this.id);
    console.log(this.book);
  }

  openDialog(): void {
    // this.firebaseService.themSoLuongSach(this.id, 1, 10000);
    const dialogRef = this.dialog.open(ThemQuyenSachDialogComponent, {
      width: '400px',
      data:{
        id:this.id
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
    this.firebaseService.deleteComment(idComment,this.id);
  }

}

