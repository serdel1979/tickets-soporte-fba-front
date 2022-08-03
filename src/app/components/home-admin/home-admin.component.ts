import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { LoginService } from 'src/app/services/login.service';
import { WebSocketService } from 'src/app/web-socket.service';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  fechahoy:any
  user!: User;
  solicitudes!: any[];
  public page!: number;

  constructor(private loginService: LoginService, private wsocketService: WebSocketService, private router: Router, private solicitudesHoy: SolicitudesService) {
    this.loginService.user.subscribe(x => this.user = x);
  }


  ngOnInit(): void {
    this.fechahoy = this.pipe.transform(Date.now(), 'dd-MM-yyyy');
    this.wsocketService.listen('signal').subscribe((data:any)=>{
      this.cargarDatos();
    })
    this.cargarDatos();
  }

  cargarDatos(){
    this.solicitudesHoy.getSolicitudesHoy().subscribe((data:any)=>{
      this.solicitudes = data;
    })
  }

  get isAdmin() {
    let { user } = this.user;
    const usr = JSON.parse(JSON.stringify(user)); //convierto string a objeto
    for (let rol of usr.roles) {
      if (rol.Role === "admin") {
        return true;
      }
    }
    return false;
  }

  editar(solicitud:any){
    this.router.navigate([`/admin/editar_solicitud/${solicitud._id}`]);
  }
}
