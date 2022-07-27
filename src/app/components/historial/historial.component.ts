import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {



  public page!: number;
  solicitudes!:any[];
  pipe = new DatePipe('en-US');
  constructor(private solicitudesService: SolicitudesService) { }

  ngOnInit(): void {
    this.solicitudesService.getSolicitudes().subscribe(data=>{
      this.solicitudes = data;
    })
  }

  convertirFecha(fecha: Date){
    return  this.pipe.transform(Date.now(), 'dd-MM-yyyy');
  }

}
