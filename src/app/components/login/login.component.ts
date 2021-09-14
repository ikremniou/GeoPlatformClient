import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private readonly _headerService: HeaderService) {
    this._headerService.changedHeader('Авторизация');
   }

  ngOnInit(): void {
  }

}
