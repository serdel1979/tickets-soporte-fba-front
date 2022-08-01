import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import * as pdfMake from  'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DataResponse } from 'src/app/interface/data.pdf';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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
    return  this.pipe.transform(fecha, 'dd-MM-yyyy');
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


  imprimir(){
    const pdf: PdfMakeWrapper = new PdfMakeWrapper();
    let dataconvertido = this.convertirData(this.solicitudes);
    let tabla = this.crateTable(dataconvertido);
    pdf.pageOrientation("landscape");
    pdf.pageSize({width:1300,height:1300});
    pdf.add(tabla);
    pdf.create().open();
   
   }

   convertirData(data: any[]): any[]{
      let tabla = [];
      tabla.push([{text: 'Historial - Soporte técnico', colSpan: 8},'','','','','','','']);
      tabla.push(['Fecha','Usuario','Departamento','Descripción','Equipo','Estado','Técnico','Informe']);
      for(let row of data){ 
        tabla.push([this.convertirFecha(row.createdAt),row.usuario,row.departamento,row.descripcion,row.equipo,row.estado,this.convertRow(row.tecnico),this.convertRow(row.informe)]);
      }
      return tabla;
    }

  convertRow(fila: string): string{
    if(fila != undefined)
      return fila;
    return "Sin definir";
  }


   crateTable(data: any): ITable{
      return new Table(data).end;
   }

}
