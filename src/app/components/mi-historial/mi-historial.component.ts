import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { DatePipe } from '@angular/common';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import * as pdfMake from  'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DataResponse } from 'src/app/interface/data.pdf';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-mi-historial',
  templateUrl: './mi-historial.component.html',
  styleUrls: ['./mi-historial.component.css']
})
export class MiHistorialComponent implements OnInit {

  user!: User;
  usr!:string;
  public page!: number;
  solicitudes!:any[];
  pipe = new DatePipe('en-US');
  constructor(private solicitudesService: SolicitudesService, private loginService: LoginService) { }

  ngOnInit(): void {
    const { user } = JSON.parse(localStorage.getItem('user') || "[]");
    this.usr = user.user;
    this.loginService.user.subscribe(x => this.user = x);
    this.solicitudesService.getMySolicitudes(this.usr).subscribe(data=>{
      this.solicitudes = data;
    })
  }

  convertirFecha(fecha: Date){
    return  this.pipe.transform(Date.now(), 'dd-MM-yyyy');
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
      tabla.push([{text: 'Mi HIstorial', colSpan: 7},'','','','','','']);
      tabla.push(['Fecha','Usuario','Descripción','Equipo','Estado','Técnico','Informe']);
      for(let row of data){ 
        tabla.push([this.convertirFecha(row.createdAt),this.convertRow(row.usuario),this.convertRow(row.descripcion),this.convertRow(row.equipo),this.convertRow(row.estado),this.convertRow(row.tecnico),this.convertRow(row.informe)]);
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
