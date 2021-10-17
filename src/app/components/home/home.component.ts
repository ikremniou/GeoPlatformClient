import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _titleService: HeaderService) {
    this._titleService.changedHeader('Главное меню');
   }

  public ngOnInit(): void {
  }

  public navigate(route: string): void {
    this._router.navigate([route]);
  }
}
