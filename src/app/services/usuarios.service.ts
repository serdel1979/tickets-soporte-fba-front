import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }


  agregaUsuario(usuario: any): Observable<any>{
    return this.http.post<any>('http://localhost:5000/users', usuario);
  }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:5000/users');
  }

  deleteUser(id:any): Observable<any>{
    return this.http.delete<any>(`http://localhost:5000/users/${id}`);
  }

}
