import { ToolbarService } from './../../../../services/subjects/toolbar.service';
import { Component, OnInit } from '@angular/core';

export class ApplicationFeature {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public applicationFeatures: ApplicationFeature[] = [
    { title: 'Расширение для Excel', subtitle: 'Надстройка для Microsoft Office Excel' },
    { title: 'Пользователи', subtitle: 'Компонент для управления пользователями' },
    { title: 'Роли', subtitle: 'Компонент для управления ролями пользователей' }
  ]

  constructor(private readonly _toolbarService: ToolbarService) { }

  public ngOnInit(): void {
    this._toolbarService.setToolbarTitle('Главное меню');
  }

}
