import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { AboutComponent } from './components/about/about.component';
import { ToolBarComponent } from './components/shared/tool-bar/tool-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RutasRoutingModule } from './routes/rutas-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ErrorComponent } from './components/shared/error/error.component';
import { CrearUserComponent } from './components/users/crear-user/crear-user.component';
import { JwtInterceptorInterceptor } from './middleware/jwt-interceptor.interceptor';
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from '@angular/forms';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { NuevaSolicitudComponent } from './components/home-user/nueva-solicitud/nueva-solicitud.component';
import { MiHistorialComponent } from './components/mi-historial/mi-historial.component';
import { HistorialComponent } from './components/historial/historial.component';
import { EditSolicitudComponent } from './components/home-admin/edit-solicitud/edit-solicitud.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'https://ticket-back-raill-production.up.railway.app', options: {} };
//ip del servidor back


@NgModule({
  declarations: [
    AppComponent,
    HomeAdminComponent,
    HomeUserComponent,
    AboutComponent,
    ToolBarComponent,
    LoginComponent,
    UsersComponent,
    ErrorComponent,
    CrearUserComponent,
    EditUserComponent,
    NuevaSolicitudComponent,
    MiHistorialComponent,
    HistorialComponent,
    EditSolicitudComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RutasRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    NgxPermissionsModule.forRoot()
  ],
  providers: [CookieService,{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
