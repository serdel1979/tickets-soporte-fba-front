import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css']
})
export class CrearUserComponent implements OnInit {

  public form!: FormGroup;
  constructor(private fb: FormBuilder, 
    private usuarioService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }

  guardar(){
    this.usuarioService.agregaUsuario(this.form.value)
      .subscribe(data => {
        this.router.navigate(['/users']);
      })
  }

}
