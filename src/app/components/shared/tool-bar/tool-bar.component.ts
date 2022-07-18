import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interface/user.interface';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {


  user!: User;
  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.user.subscribe(x => this.user = x);
  }

  title = 'Incidentes';
  ngOnInit() {
    //this.user = this.loginService.getUser();
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

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
