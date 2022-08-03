import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { ISolicitud } from '../../interface/solicitud.interface';
import { WebSocketService } from '../../web-socket.service';
declare var window: any;

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  formModal: any;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  fechahoy:any
  user!: any;
  solicitudes!: ISolicitud[];
  solicitudEstado! : string;
  solicitudTecnico! : string;
  solicitudInforme! : string;
  pressver:boolean = false;
  public page!: number;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private solicitudesServices: SolicitudesService,
    private router: Router,
    private websocket: WebSocketService) { 

    }

  ngOnInit(): void {
    this.fechahoy = this.pipe.transform(Date.now(), 'dd-MM-yyyy');
    this.loginService.userLogueado().subscribe(data=>{
      this.user = data;
    })
    const { user } = this.user;
    this.websocket.listen('signal').subscribe((data:any)=>{
      this.solicitudesServices.getMySolicitudesDeHoy(user.user).subscribe(dat => {
        this.solicitudes = dat;
      });
    })
    this.solicitudesServices.getMySolicitudesDeHoy(user.user).subscribe(data => {
      this.solicitudes = data;
    });
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  

  cargaDatos(){

  }

  solicitudNueva(){
    this.router.navigate(['/home/crear-solicitud']);
  }

  openModal(s:any) {
    this.solicitudEstado = s.estado;
    this.solicitudTecnico = s.tecnico;
    this.solicitudInforme = s.informe;
    this.formModal.show();
  }

  cierraModal(){
    this.formModal.hide();
  }

}
