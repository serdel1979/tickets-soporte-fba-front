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


}
