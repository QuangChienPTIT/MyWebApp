import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AuthService } from './auth.service';
import * as _ from 'lodash';
import { LoginRegisterDialogComponent } from '../account/login-register-dialog/login-register-dialog.component';
import { MatDialog } from '../../../node_modules/@angular/material/dialog';
import { forEach } from '../../../node_modules/@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userRoles: Array<string>;
  dataNow: Date = new Date();
  dateNowMilliseconds;
  isadmin = false;


  constructor(private db: AngularFireDatabase, public dialog: MatDialog, private authService: AuthService) {
    this.authService.getUser().subscribe(auth => {
      console.log("Books" + auth.uid);
      this.db.object('User/' + auth.uid + '/role').valueChanges().subscribe(role => {
        if (role == 'admin') {
          this.isadmin = true;
        }
      });
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginRegisterDialogComponent, {
      width: '700px',
    });
  }

  getBooks() {
    return this.db.list('Book').snapshotChanges();
  }

  searchBookByName(searchString){
    return this.db.list('Book',ref=>ref.orderByChild('name').startAt(searchString).endAt(searchString+'\uf8ff')).snapshotChanges();
  }

  

  searchUserByName(searchString){
    return this.db.list('User',ref=>ref.orderByChild('lastName').startAt(searchString).endAt(searchString+'\uf8ff')).snapshotChanges();

  }

  getSachMuon() {
    return this.db.list('SachMuon').snapshotChanges();

  }
  getSachMuonByQuyenSach(idQuyenSach){
    return this.db.list('SachMuon/',ref=>ref.orderByChild('idQuyenSach').equalTo(idQuyenSach)).snapshotChanges();
  }
  getBookDetails(id) {
    return this.db.object('Book/' + id).valueChanges();
  }

  getAuthorbyBook(idBook) {
    return this.db.list('AuthorBook', ref => ref.orderByChild(idBook).equalTo(true)).snapshotChanges();
  }


  getListTheLoai() {
    return this.db.list('Type').snapshotChanges();
  }


  getListAuthor() {
    return this.db.list('Author').snapshotChanges();

  }

  getListSachMuon() {
    return this.db.list('SachMuon' ).snapshotChanges();
  }

  getUserName(idUser) {
    return this.db.object('User/' + idUser + '/lastName').valueChanges();
  }
  getUserIMG(idUser) {
    return this.db.object('User/' + idUser + '/imgURL').valueChanges();
  }

  getUserBlocked(){
    return this.db.list('User/',ref=>ref.orderByChild('isBlocked').equalTo(true)).snapshotChanges();
  }

  getBookName(idQuyenSach) {
    var idBook;
    var data = this.db;
    this.db.database.ref('QuyenSach/' + idQuyenSach + '/idBook').once('value').then(function (snapshot) {
      return data.object('Book/' + snapshot.val() + '/name').valueChanges();
      // console.log(snapshot.val());
    })

  }
  getComments(idBook) {
    return this.db.list('Comment/' + idBook).snapshotChanges();
  }

  getBookByQuyenSach(idQuyenSach) {
    return this.db.list('Book', ref => ref.orderByChild("QuyenSach/" + idQuyenSach + '/tinhTrang').startAt(1)).snapshotChanges(['child_added']);
  }

  getAllQuyenSachByBook(idBook){
    return this.db.list('Book/' + idBook + '/QuyenSach/' ).snapshotChanges();
  }

 

  getQuyenSach(idBook, idQuyenSach) {
    return this.db.object('Book/' + idBook + '/QuyenSach/' + idQuyenSach).valueChanges();
  }

  getTinhTrangQuyenSach(idBook, idQuyenSach) {
    return this.db.object('Book/' + idBook + '/QuyenSach/' + idQuyenSach + '/tinhTrang').valueChanges();
  }

  getGia(idBook, idQuyenSach) {
    return this.db.object('Book/' + idBook + '/QuyenSach/' + idQuyenSach + '/gia').valueChanges();
  }
  //addBook

  addBook(name, description, imgURL, idAuthors, idTheLoai, soLuong, gia) {
    if (this.isadmin) {
      var idBook = this.db.list('Book').push({
        name: name,
        description: description,
        imgURL: imgURL,
        idType: idTheLoai
      }).key;
      this.addBookForAuthor(idAuthors, idBook);
      // this.addBookForTheLoai(idTheLoais, idBook);
      this.addQuyenSach(idBook, soLuong, gia);
    }
    else {
      alert("Bạn không có đủ quyền")
    }
  }

  addBookForAuthor(idAuthors, idBook) {
    for (let idAuthor of idAuthors) {
      this.db.database.ref().child("Author/"+idAuthor+'/Book/'+idBook).set(true);
    }
  }
  // addBookForTheLoai(idTheLoais, idBook) {
  //   for (let idTheLoai of idTheLoais) {
  //     this.db.database.ref().child('TypeBook').child(idTheLoai).child(idBook).set(true);
  //   }
  // }

  addQuyenSach(idBook, soLuong, gia: number) {
    for (var i = 0; i < soLuong; i++) {

      this.db.database.ref('Book/' + idBook).child('QuyenSach').push({
        gia: +gia,
        dangMuon: false,
        tinhTrang: 1
      })
    }

  }

  addAuthor(authorName, description) {
    this.db.database.ref('Author').push({
      name: authorName,
      description: description,
    })
  }

  addType(typeName, description) {
    this.db.database.ref('Type').push({
      name: typeName,
      description: description,
    })
  }

  themSoLuongSach(idBook, soLuong, gia) {
    if (this.isadmin) {
      var ref = this.db.database.ref('Book/' + idBook + '/QuyenSach');
      for (var i = 0; i < soLuong; i++) {
        ref.push({
          gia: +gia,
          dangMuon: false,
          tinhTrang: 1
        })
      }
    }
  }
  //delete
  deleteComment(idComment, idBook) {
    if (this.isadmin) { this.db.database.ref('Comment/' + idBook + '/' + idComment).remove(); }
  }

  choMuonSach(id) {
    if (this.isadmin) {
    this.dateNowMilliseconds = this.dataNow.getTime();
      console.log(this.dateNowMilliseconds);
      this.db.database.ref('SachMuon/' + id + '/ngayMuon').set(this.dateNowMilliseconds + "");
    }

  }
  traSach(id, tinhTrang,idBook,idQuyenSach,tienPhat) {
    if (this.isadmin) {
    this.dateNowMilliseconds = this.dataNow.getTime();
      console.log(this.dateNowMilliseconds);
      this.db.database.ref('SachMuon/'  + id + '/ngayTra').set(this.dateNowMilliseconds + "");
      this.db.database.ref('SachMuon/'  + id + '/tinhTrangTra').set(tinhTrang);
      this.db.database.ref('SachMuon/'  + id + '/tienPhat').set(tienPhat);
      this.db.database.ref('Book/' + idBook + '/QuyenSach/' + idQuyenSach + '/tinhTrang').set(tinhTrang);
      //this.db.database.ref('Book/' + idBook + '/QuyenSach/' + idQuyenSach + '/dangMuon').set(false);
    }
  }

  khoaTaiKhoan(idUser){
    this.db.database.ref('User/'+idUser+'/isBlocked').set(true);
  }

  moKhoaTaiKhoan(idUser){
    this.db.database.ref('User/'+idUser+'/isBlocked').set(false);
  }

}
