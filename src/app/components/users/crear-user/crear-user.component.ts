import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Role } from 'src/app/role/role.enum';
import { UserAdd } from 'src/app/interface/user-add.class';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css']
})
export class CrearUserComponent implements OnInit {

  public user_new!:  UserAdd;
  public form!: FormGroup;
  ok = false;
  error = false;
  submitted = false;
  formValid = true;

  constructor(private fb: FormBuilder, 
    private usuarioService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,) { }

  

  ngOnInit(): void {
    this.ok = false;
    this.formValid = true;
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  

  parseRole(aString: string):any{
    if (aString === 'admin'){
      return {"Role":Role.Admin};
    };
    return {"Role":Role.User};
  }

  limpiar(){
    this.form.reset();
  }

  volver(){
    this.router.navigate(['/users']);
  }

  guardar(){
    this.submitted = true;
    this.formValid = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      this.formValid = false;
      return;
    }

    this.ok = true;
    let user: string = this.form.value['user'];
    let pass: string = this.form.value['password'];
    let rol: Role = this.form.value['role'];
    this.user_new = new UserAdd(user,pass,this.parseRole(rol));
    this.usuarioService.agregaUsuario(this.user_new)
      .subscribe(data => {
        this.error = false;
        this.ok = true;
    },(err: any) => {
      this.error = true;
      this.ok = false;
  });
  }

}
