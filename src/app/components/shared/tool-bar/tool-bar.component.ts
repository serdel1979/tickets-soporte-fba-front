import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {


  user!: User;
  constructor(private loginService: LoginService, private router: Router,) { }

  title = 'Incidentes';
  ngOnInit() {
  }

  get isAdmin() {
    for (let rol of this.user.roles) {
      console.log("rol ->", rol);
      if (rol === "admin") return true;
    }
    return false;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
