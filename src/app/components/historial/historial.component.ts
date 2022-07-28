import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {



  public page!: number;
  solicitudes!:any[];
  filterSol: string = '';
  pipe = new DatePipe('en-US');
  constructor(private solicitudesService: SolicitudesService, private router: Router) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this.solicitudesService.getSolicitudes().subscribe(data=>{
      this.solicitudes = data;
    })
  }

  convertirFecha(fecha: Date){
    return  this.pipe.transform(Date.now(), 'dd-MM-yyyy');
  }

  onKeypressEvent(event: any) {
    this.page = 1;
    const filtro = this.solicitudes.filter(sol => {
      return sol.departamento.includes(this.filterSol) || sol.usuario.includes(this.filterSol)  || sol.estado.includes(this.filterSol);
    });
    this.solicitudes = filtro;
    if (this.filterSol == '' || this.filterSol.length == 1) {
      this.cargarDatos();
    }
  }

  editar(s:any){
    this.router.navigate([`/admin/editar_solicitud/${s._id}`]);
  }



}
