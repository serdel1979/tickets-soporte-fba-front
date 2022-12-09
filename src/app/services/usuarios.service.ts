import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { UserEdit } from '../interface/user-edit';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  API = 'https://ticket-back-raill-production.up.railway.app';

  agregaUsuario(usuario: any): Observable<any>{
    return this.http.post<any>(`${this.API}/api/v1/users`, usuario);
  }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>(`${this.API}/api/v1/users`);
  }

  deleteUser(id:any): Observable<any>{
    return this.http.delete<any>(`${this.API}/api/v1/users/${id}`);
  }

  getUser(id:any): Observable<any>{
    return this.http.get<any>(`${this.API}/api/v1/users/${id}`);
  }

  editUser(id:any, user: any): Observable<any>{
    return this.http.patch<any>(`${this.API}/api/v1/users/${id}`, user);
  }

}
