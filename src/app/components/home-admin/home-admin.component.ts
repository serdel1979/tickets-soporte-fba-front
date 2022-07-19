import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  user!: User;
  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.user.subscribe(x => this.user = x);
  }


  ngOnInit(): void {
  }


  get isAdmin() {
    let { user } = this.user;
    const usr = JSON.parse(JSON.stringify(user)); //convierto string a objeto
    for (let rol of usr.roles) {
      if (rol.Role === "admin") {
        return true;
      }
    }
    return false;
  }
}
