import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserEdit } from 'src/app/interface/user-edit';
import { Role } from 'src/app/role/role.enum';
import { UsuariosService } from '../../../services/usuarios.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public form!: FormGroup;
  submitted = false;
  formValid = true;
  isadmin!: boolean;
  user!: User;
  id!: string;
  show: boolean = false;
  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.usuarioService.getUser(this.id).subscribe(data => {
      this.user = data;
      this.isadmin = this.isAdmin();
      this.form.controls['user'].setValue(this.user['user']);
      this.form.controls['roleadmin'].setValue(this.isadmin);
    })
    this.form = this.fb.group({
      user: [''],
      reset: [''],
      password: [''],
      roleadmin: [''],
    });



  }

  isAdmin(): boolean {
    for (let rol of this.user.roles) {
      const keys = Object.keys;
      for (const r of keys(rol)) {
        const roleAsKey = r as keyof typeof rol;
        if (rol[roleAsKey] == 'admin') {
          return true;
        }
      }
    }
    return false;
  }

  parseRole(aString: string): any {
    if (aString === 'admin') {
      return { "Role": Role.Admin };
    };
    return { "Role": Role.User };
  }

  volver() {
    this.router.navigate(['/users']);
  }

  guardar() {
    this.submitted = true;
    this.formValid = true;
    if (this.form.invalid) {
      this.formValid = false;
      return;
    }
    const usrnuevo = this.usuarioEditado(this.form.value);
    this.usuarioService.editUser(this.id, usrnuevo)
      .subscribe(data => {
        swal.fire('Ok', 'Usuario modificado', 'success');
      }, (err: any) => {

        const { code } = err.error.error;
        if (code == 11000) {
          swal.fire('Error', 'El usuario ya existe', 'error');
        }
        else {
          swal.fire('Error', 'Error inesperado', 'error');
        }
      });
  }


  password() {
    this.show = !this.show;
  }

  usuarioEditado(form: any): any {
    let roladmin = this.form.value['roleadmin'];
    console.log(typeof roladmin);
    let roles: Array<any> = []
    roles.push({ "Role": "user" })
    if (roladmin) {
      roles.push({ "Role": "admin" })
    }
    //tengo los roles
    let user = this.form.value['user'];
    let password = this.form.value['password'];
    if (user && password) {
      return { user: user, password: password, roles: roles };
    }
    if (user && !password) {
      return { user: user, roles: roles };
    }
    if (!user && password) {
      return { password: password, roles: roles };
    }
  }


}
