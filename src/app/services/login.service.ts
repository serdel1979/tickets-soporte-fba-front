import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || "[]"));
    this.user = this.userSubject.asObservable();
   }

  public get userValue():User {
    return this.userSubject.value;
  }

  login(user: User):any {
    return this.http.post<User>('http://localhost:5000/auth/login', user).pipe(map((user: User) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
  }));
  }

  logout() {
      localStorage.removeItem('user');
      //this.userSubject.next(null);
  }

}
