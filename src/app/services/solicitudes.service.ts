import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http: HttpClient) { }


  //usado para el historial de cada departamento
  getMySolicitudes(dep:string): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:5000/solicitudes/${dep}`);
  }

  getSolicitudes(): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:5000/solicitudes`);
  }

  getSolicitud(id:string):Observable<any>{
    return this.http.get<any>(`http://localhost:5000/solicitudes/solicitud/${id}`);
  }

  getSolicitudesHoy(): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:5000/solicitudes/defecha`);
  }

  getMySolicitudesDeHoy(dep:string): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:5000/solicitudes/dehoy/${dep}`);
  }

  crearSolicitud(solicitud:any): Observable<any>{
    return this.http.post<any>(`http://localhost:5000/solicitudes`,solicitud);
  }

  editaSolicitud(id:string, solicitud: any): Observable<any>{
    return this.http.patch<any>(`http://localhost:5000/solicitudes/${id}`,solicitud);
  }

}
