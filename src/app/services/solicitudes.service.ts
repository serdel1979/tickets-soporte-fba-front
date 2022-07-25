import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http: HttpClient) { }


  getMySolicitudes(dep:string): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:5000/solicitudes/${dep}`);
  }


  getMySolicitudesDeHoy(dep:string): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:5000/solicitudes/dehoy/${dep}`);
  }

  crearSolicitud(solicitud:any): Observable<any>{
    return this.http.post<any>(`http://localhost:5000/solicitudes`,solicitud);
  }


}
