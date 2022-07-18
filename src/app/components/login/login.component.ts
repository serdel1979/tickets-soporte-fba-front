import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form : FormGroup;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private cookie: CookieService) {
      this.form = this.fb.group({
        user: ['', Validators.required],
        password: ['', Validators.required],
      });
     }

  ngOnInit(): void {

  }


  send():any{
    this.loginService.login(this.form.value)
    .subscribe((data: User) => {
      this.cookie.set('cookie-name', data.token);
      console.log("Respuesta",{data});
    })
  }

}


