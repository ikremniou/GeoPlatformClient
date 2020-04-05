import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    userName: new FormControl(),
    userPassword: new FormControl(),
  });

  constructor() { }

  public ngOnInit(): void {
  }

  public submitLogin(): void {
    console.log(`[LoginComponent] Submitting token request`);
  }
}
