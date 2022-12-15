import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { HistorialComponent } from '../components/historial/historial.component';
import { EditSolicitudComponent } from '../components/home-admin/edit-solicitud/edit-solicitud.component';
import { HomeAdminComponent } from '../components/home-admin/home-admin.component';
import { HomeUserComponent } from '../components/home-user/home-user.component';
import { NuevaSolicitudComponent } from '../components/home-user/nueva-solicitud/nueva-solicitud.component';
import { LoginComponent } from '../components/login/login.component';
import { MiHistorialComponent } from '../components/mi-historial/mi-historial.component';
import { CrearUserComponent } from '../components/users/crear-user/crear-user.component';
import { EditUserComponent } from '../components/users/edit-user/edit-user.component';
import { UsersComponent } from '../components/users/users.component';
import { LoginGuard } from '../middleware/login-guard.guard';
import { RolesGuard } from '../middleware/roles.guard';

const routes: Routes = [
  { path: 'login', 
    component: LoginComponent
  },  
  { path: 'admin', 
    component: HomeAdminComponent, 
    canActivate : [LoginGuard,RolesGuard]
  }, 
  { path: 'admin/editar_solicitud/:id', 
    component: EditSolicitudComponent, 
    canActivate : [LoginGuard,RolesGuard]
  },
  { path: 'users', 
    component: UsersComponent, 
    canActivate : [LoginGuard,RolesGuard]
  },
  { path: 'users/crear-usuario', 
    component: CrearUserComponent, 
    canActivate : [LoginGuard,RolesGuard]
  },
  { path: 'users/editar-usuario/:id', 
    component: EditUserComponent, 
    canActivate : [LoginGuard,RolesGuard]
  },
  { path: 'home', 
    component: HomeUserComponent, 
    canActivate : [LoginGuard]
  }, 
  { path: 'home/crear-solicitud', 
    component: NuevaSolicitudComponent, 
    canActivate : [LoginGuard]
  }, 
  { path: 'historial', 
    component: HistorialComponent, 
    canActivate : [LoginGuard,RolesGuard] 
  },
  { path: 'mi_historial', 
    component: MiHistorialComponent, 
    canActivate : [LoginGuard] 
  },
  { path: '**',
    pathMatch: 'full', 
    redirectTo: 'login' 
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
