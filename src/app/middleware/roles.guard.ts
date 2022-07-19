import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {
  user!: User;
  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.user.subscribe(x => this.user = x);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let { user } = this.user;
    const usr = JSON.parse(JSON.stringify(user)); //convierto string a objeto
    for (let rol of usr.roles) {
      if (rol.Role === "admin") {
        return true;
      }
    }
    this.router.navigateByUrl('error');
    return false;
    
  }
  
}
