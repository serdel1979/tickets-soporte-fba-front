import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { HomeAdminComponent } from '../components/home-admin/home-admin.component';
import { HomeUserComponent } from '../components/home-user/home-user.component';
import { LoginComponent } from '../components/login/login.component';
import { CrearUserComponent } from '../components/users/crear-user/crear-user.component';
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
  { path: 'users', 
    component: UsersComponent, 
    canActivate : [LoginGuard,RolesGuard]
  },
  { path: 'users/crear-usuario', 
    component: CrearUserComponent, 
    canActivate : [LoginGuard,RolesGuard]
  },
  { path: 'home', 
    component: HomeUserComponent, 
    canActivate : [LoginGuard]
  }, 
  { path: 'about', 
    component: AboutComponent, 
    canActivate : [LoginGuard] 
  },
  { path: '',
    pathMatch: 'full', 
    redirectTo: 'login' 
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
