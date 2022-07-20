import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css']
})
export class CrearUserComponent implements OnInit {

  public form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      roles: ['', Validators.required]
    });
  }

  guardar(){
    console.log(this.form.value);
  }

}
