import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { UserEdit } from '../interface/user-edit';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }


  agregaUsuario(usuario: any): Observable<any>{
    return this.http.post<any>('http://192.168.1.8:3000/api/v1/users', usuario);
  }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>('http://192.168.1.8:3000/api/v1/users');
  }

  deleteUser(id:any): Observable<any>{
    return this.http.delete<any>(`http://192.168.1.8:3000/api/v1/users/${id}`);
  }

  getUser(id:any): Observable<any>{
    return this.http.get<any>(`hhttp://192.168.1.8:3000/api/v1/users/${id}`);
  }

  editUser(id:any, user: any): Observable<any>{
    return this.http.patch<any>(`http://192.168.1.8:3000/api/v1/users/${id}`, user);
  }

}
