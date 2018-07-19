import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xemsach',
  templateUrl: './xemsach.component.html',
  styleUrls: ['./xemsach.component.css']
})
export class XemsachComponent implements OnInit {
  name=1;
  model = {
    imgurl : 'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-1/p160x160/17499262_1336080703124923_3772205894237873330_n.jpg?oh=ba6692ba88fa83250fd6cdb38607270c&oe=5AB9950D',
    name : "Lê Anh",
    city : "Hà Nội",
    country : "Việt Nam",
    phone : "0955454545"
};
  constructor() { }

  ngOnInit() {
  }

}
