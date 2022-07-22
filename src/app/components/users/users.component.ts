import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var window: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  formModal: any;
  usrdelet: any;
  filterUser: string = '';
  usuarios!: User[];

  public page!: number;


  constructor(private usuarioService: UsuariosService) { }


  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.cargarDatos();
  }

  cargarDatos() {
    this.usuarioService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  getRol(rol: any) {
    if (rol.Role === "admin") {
      return 'Administrador';
    }
    return 'Usuario';
  }


  onKeypressEvent(event: any) {
    this.page = 1;
    const filtro = this.usuarios.filter(usr => {
      return usr.user.includes(this.filterUser);
    });
    this.usuarios = filtro;
    if (this.filterUser == '' || this.filterUser.length == 1) {
      this.cargarDatos();
    }
  }

  openFormModal(usr: any) {
    this.usrdelet = usr;
    this.formModal.show();
  }
  deleteUser() {
    this.usuarioService.deleteUser(this.usrdelet._id).subscribe(data=>{
    })
    this.formModal.hide();
    this.cargarDatos();
  }

  cancelDelete(){
    this.usrdelet = null;
  }

}
