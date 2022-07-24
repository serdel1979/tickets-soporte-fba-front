import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interface/user.interface';
import { NgxRolesService } from 'ngx-permissions';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../role/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  user!: any;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,) {

    if (this.loginService.userValue) {
      this.router.navigate(['/home']);
    }
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }


  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.loginService.login(this.form.value)
      .pipe(first())
      .subscribe(
        (data:any) => {
          this.user = data;
          if (this.isAdmin()){
            this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/home']);
          }
        //  this.router.navigate([this.returnUrl]);
        },(err: any) => {
          console.log(err);
          if(err.status == 403){
            this.error = err.error['error'];
          }else{
            this.error = "Revisar longitud de los campos"
          }
        
          this.loading = false;
      });
  }


  isAdmin(): boolean {
    for (let rol of this.user.user.roles) {
      const keys = Object.keys;
      for (const r of keys(rol)) {
        const roleAsKey = r as keyof typeof rol;
        if (rol[roleAsKey] == 'admin') {
          return true;
        }
      }
    }
    return false;
  }


}


