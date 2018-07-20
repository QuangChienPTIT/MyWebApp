import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhapsachComponent } from '../nhapsach/nhapsach.component';
import { XemsachComponent } from '../xemsach/xemsach.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'book', component: NhapsachComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }