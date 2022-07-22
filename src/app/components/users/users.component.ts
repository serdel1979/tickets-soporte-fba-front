import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  
  usuarios!:User[];

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

  getRol(rol:any){
    if (rol.Role === "admin") {
      return 'Administrador';
    }
    return 'Usuario';
  }

}
