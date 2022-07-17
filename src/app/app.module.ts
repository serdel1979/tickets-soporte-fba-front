import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { AboutComponent } from './components/about/about.component';
import { ToolBarComponent } from './components/shared/tool-bar/tool-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RutasRoutingModule } from './rutas/rutas-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeAdminComponent,
    HomeUserComponent,
    AboutComponent,
    ToolBarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RutasRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
