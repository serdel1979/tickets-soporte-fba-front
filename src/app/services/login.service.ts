import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;
  private nombreUser!: any;
  constructor(private http: HttpClient,
    private cookie: CookieService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || "[]"));
    this.user = this.userSubject.asObservable();
   }

  public get userValue():User {
    return this.userSubject.value;
  }

  login(user: User):any {
    return this.http.post<User>('/api/v1/auth/login', user).pipe(map((user: User) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.cookie.set('cookie-name', user.token,0.3,'/');
      this.userSubject.next(user);
      this.nombreUser = user;
      return user;
  }));
  }

  getUser(){
    const { user } = this.nombreUser;
    return user.user;
  }

  userLogueado(){
    return this.user;
  }

  logout() {
    this.cookie.delete('cookie-name','/');
    localStorage.removeItem('user');
    //this.userSubject.next(null);
  }

}
