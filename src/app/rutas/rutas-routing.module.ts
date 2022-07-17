import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { HomeAdminComponent } from '../components/home-admin/home-admin.component';
import { HomeUserComponent } from '../components/home-user/home-user.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},  
  { path: 'admin', component: HomeAdminComponent}, 
  { path: 'home', component: HomeUserComponent}, 
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }, 
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RutasRoutingModule { }
