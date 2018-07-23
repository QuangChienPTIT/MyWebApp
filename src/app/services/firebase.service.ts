import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  books: Observable<any[]>;
  sachMuon: Observable<any[]>;
  bookDetails: Observable<any>;


  constructor(private db: AngularFireDatabase) { }
  getBooks() {
    this.books = this.db.list('Book').snapshotChanges();
    return this.books;
  }
  getSachMuon() {
    this.sachMuon = this.db.list('SachMuon').snapshotChanges();
    return this.sachMuon;
  }
  getBookDetails(id) {
    this.bookDetails = this.db.object('Book/' + id).valueChanges();
    return this.bookDetails;
  }

  getAuthorbyBook(idBook){
    return this.db.list('AuthorBook',ref=>ref.orderByChild(idBook).equalTo(true)).snapshotChanges();
  }
  

  getListTheLoai() {
    return this.db.list('Type').snapshotChanges();
  }


  getListAuthor() {
    return this.db.list('Author').snapshotChanges();

  }

  getListSachMuon(idUser){
    return this.db.list('SachMuon/'+idUser).snapshotChanges();
  }

  getUserName(idUser){
    return this.db.object('User/'+idUser+'/lastName').valueChanges();
  }

  getBookName(idQuyenSach){
    var idBook;
    var data = this.db;
    this.db.database.ref('QuyenSach/'+idQuyenSach+'/idBook').once('value').then(function(snapshot){
      return data.object('Book/'+snapshot.val()+'/name').valueChanges();
      // console.log(snapshot.val());
    })
      
    
  }  

  getBookByQuyenSach(idQuyenSach){
    return this.db.list('Book',ref=>ref.orderByChild("QuyenSach/"+idQuyenSach+'/tinhTrang').startAt(1)).snapshotChanges(['child_added']);
  }
//addBook

  addBook(name, description, imgURL, idAuthors, idTheLoais, soLuong, gia) {
    var idBook = this.db.list('Book').push({
      name: name,
      description: description,
      imgURL: imgURL
    }).key;
    this.addBookForAuthor(idAuthors, idBook);
    this.addBookForTheLoai(idTheLoais, idBook);
    this.addQuyenSach(idBook, soLuong, gia);
  }

  addBookForAuthor(idAuthors, idBook) {
    for (let idAuthor of idAuthors) {
      this.db.database.ref().child("AuthorBook").child(idAuthor).child(idBook).set(true);
    }
  }
  addBookForTheLoai(idTheLoais, idBook) {
    for (let idTheLoai of idTheLoais) {
      this.db.database.ref().child('TypeBook').child(idTheLoai).child(idBook).set(true);
    }
  }

  addQuyenSach(idBook, soLuong, gia: number) {
    for (var i = 0; i < soLuong; i++) {

      this.db.database.ref('Book/'+idBook).child('QuyenSach').push({
        gia: +gia,
        dangMuon: false,
        tinhTrang: 1
      })
    }

  }


}
