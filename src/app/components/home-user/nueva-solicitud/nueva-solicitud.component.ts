import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISolicitud } from 'src/app/interface/solicitud.interface';
import { LoginService } from '../../../services/login.service';
import { SolicitudesService } from '../../../services/solicitudes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.component.html',
  styleUrls: ['./nueva-solicitud.component.css']
})
export class NuevaSolicitudComponent implements OnInit {

  public form!: FormGroup;
  user!: any;
  submitted = false;
  solicitud!: ISolicitud;

  constructor(private fb: FormBuilder, private router: Router,
    private loginService: LoginService,
    private solicitudesService: SolicitudesService) { }

  ngOnInit(): void {
    this.loginService.userLogueado().subscribe(data => {
      this.user = data;
    })
    const { user } = this.user;
    this.crearFormulario();
  }

  crearFormulario() {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      usuario: ['', Validators.required],
      departamento: ['', Validators.required],
      equipo: ['', Validators.required],
      estado: ['']
    });
    this.form.controls['departamento'].setValue(this.user['user'].user);
    this.form.controls['estado'].setValue("PENDIENTE");
  }


  guardar() {
    this.solicitudesService.crearSolicitud(this.form.value)
      .subscribe(data => {
        this.volver();
      },
        (err: any) => {
          const { code } = err.error.error;
          swal.fire(`Error ${code}`, 'Error en el envío', 'error');
        })
  }


  volver() {
    this.router.navigate(['/home']);
  }

}
