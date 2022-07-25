import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { ISolicitud } from '../../interface/solicitud.interface';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  fechahoy:any
  user!: any;
  solicitudes!: ISolicitud[];
  public page!: number;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private solicitudesServices: SolicitudesService) { 

    }

  ngOnInit(): void {
    this.fechahoy = this.pipe.transform(Date.now(), 'dd-MM-yyyy');
    this.loginService.userLogueado().subscribe(data=>{
      this.user = data;
    })
    const { user } = this.user;
    this.solicitudesServices.getMySolicitudes(user.user).subscribe(data => {
      this.solicitudes = data;
    });
  }

}
