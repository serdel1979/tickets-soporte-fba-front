import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  filterUser: string = '';
  usuarios!: User[];

  public page!: number;


  constructor(private usuarioService: UsuariosService) { }


  ngOnInit(): void {
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
      if (this.filterUser == '' || this.filterUser.length == 1){
        this.cargarDatos();
      }
      console.log(`filtro: ${this.filterUser} y encontrasos -->`, this.usuarios);
  }


}
