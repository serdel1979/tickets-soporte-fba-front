import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { AboutComponent } from './components/about/about.component';
import { ToolBarComponent } from './components/shared/tool-bar/tool-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RutasRoutingModule } from './rutas/rutas-routing.module';
import { ToolBarUserComponent } from './components/shared/tool-bar-user/tool-bar-user.component';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeAdminComponent,
    HomeUserComponent,
    AboutComponent,
    ToolBarComponent,
    LoginComponent,
    ToolBarUserComponent,
    UsersComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RutasRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
