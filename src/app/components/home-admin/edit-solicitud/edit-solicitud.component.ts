import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudesService } from '../../../services/solicitudes.service';
import swal from 'sweetalert2';
import { WebSocketService } from 'src/app/web-socket.service';

@Component({
  selector: 'app-edit-solicitud',
  templateUrl: './edit-solicitud.component.html',
  styleUrls: ['./edit-solicitud.component.css']
})
export class EditSolicitudComponent implements OnInit {

  id!: string;
  solicitud!: any;
  public form!: FormGroup;
  public formver!: FormGroup;
  constructor(private fb: FormBuilder,private wsocketService: WebSocketService ,private rutaActiva: ActivatedRoute, private router: Router, private solicitudesServices: SolicitudesService) { }

  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params['id'];
    this.solicitudesServices.getSolicitud(this.id).subscribe(data => {
      this.solicitud = data;

      this.form = this.fb.group({
        tecnico: ['', Validators.required], //this.form.controls['type_real_state'].setValue(this.inmobiliario['type_real_state']);
        estado: ['', Validators.required],
        informe: ['', Validators.required],
      });
      this.formver = this.fb.group({
        descripcion: [''],
        departamento: [''],
        equipo: [''],
        usuario: [''],
      });
      this.form.controls['tecnico'].setValue(this.solicitud['tecnico']);
      this.form.controls['estado'].setValue(this.solicitud['estado']);
      this.form.controls['informe'].setValue(this.solicitud['informe']);
      this.formver.controls['descripcion'].setValue(this.solicitud['descripcion']);
      this.formver.controls['departamento'].setValue(this.solicitud['departamento']);
      this.formver.controls['usuario'].setValue(this.solicitud['usuario']);
      this.formver.controls['equipo'].setValue(this.solicitud['equipo']);
    })
  }

  guardar() {
    this.solicitudesServices.editaSolicitud(this.id, this.form.value).subscribe(data => {
      this.wsocketService.sendMessage("Admin edita solicitud");
      swal.fire('Ok', 'Usuario modificado', 'success');
      this.volver();
    }, (err: any) => {
      swal.fire('Error', 'Error inesperado', 'error');
    });
  }

  volver() {
    this.router.navigate(['/admin']);
  }

}
