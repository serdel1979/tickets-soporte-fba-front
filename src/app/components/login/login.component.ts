import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interface/user.interface';
import { NgxRolesService } from 'ngx-permissions';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private cookie: CookieService,
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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
          this.cookie.set('cookie-name', data.token);
          this.router.navigate([this.returnUrl]);
        },
        (error: string) => {
          this.error = error;
          this.loading = false;
        });
  }

}


