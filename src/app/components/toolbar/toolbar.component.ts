import { ToolbarService } from './../../services/subjects/toolbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {
  public toolbarTitle = 'ВитГеоГрупп'

  constructor(private readonly _toolbarService: ToolbarService) { }

  public ngOnInit(): void {
    this._toolbarService.onToolbarTitleChanged().subscribe({
      next: (toolbarTitle: string) => {
        this.toolbarTitle = toolbarTitle;
      }
    })
  }
}
