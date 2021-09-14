import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/services/header/header.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnDestroy {
  public activePage = '';
  private readonly _headerSubscription: Subscription;

  constructor(private readonly _headerService: HeaderService) { 
    this._headerSubscription = this._headerService.onHeaderChanged((newHeader) => {
      this.activePage = newHeader;
    });
  }

  public ngOnDestroy(): void {
    this._headerSubscription.unsubscribe();
  }
}
