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
  public user_edit!: UserEdit;
  submitted = false;
  formValid = true;
  user!: User;
  id!: string;
  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.form = this.fb.group({
      user: [''],
      reset: [''],
      password: [''],
      roleadmin: [''],
      roleuser: [''],
    });

    this.usuarioService.getUser(this.id).subscribe(data => {
      this.user = data;
      this.form.controls['user'].setValue(this.user['user']);
      console.log(this.form);
    })

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
    // stop here if form is invalid
    if (this.form.invalid) {
      this.formValid = false;
      return;
    }

    let user: string = this.form.value['user'];
    let pass: string = this.form.value['password'];
    let roladmin: Role = this.form.value['roleadmin'];
    let roleuser: Role = this.form.value['roleuser'];
    this.user_edit = new UserEdit(user, pass, this.parseRole(roleuser));
    console.log("usuario a guardar ",this.user_edit);
    if (roladmin) {
      console.log(roladmin);
    }
    this.usuarioService.editUser(this.id,this.user_edit)
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
}
