import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { HomeAdminComponent } from '../components/home-admin/home-admin.component';
import { HomeUserComponent } from '../components/home-user/home-user.component';
import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';
import { UserGuardGuard } from '../user-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},  
  { path: 'admin', component: HomeAdminComponent, canActivate : [UserGuardGuard]}, 
  { path: 'users', component: UsersComponent, canActivate : [UserGuardGuard]},
  { path: 'home', component: HomeUserComponent, canActivate : [UserGuardGuard]}, 
  { path: 'about', component: AboutComponent, canActivate : [UserGuardGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
