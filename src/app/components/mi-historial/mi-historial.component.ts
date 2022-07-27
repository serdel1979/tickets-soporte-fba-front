import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { DatePipe } from '@angular/common';

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

}
