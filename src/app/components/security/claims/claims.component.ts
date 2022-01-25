import { Component } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { ActionKeys, Claim, subjectResolver } from 'src/app/models/claim.model';
import { ClaimService } from 'src/app/services/claim/claim.service';
import { HeaderService } from 'src/app/services/header/header.service';
import { claimsMessages } from '../locale';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.sass'],
})
export class ClaimsComponent implements DataTableConsumer<Claim> {
  public entityClass = Claim;
  public displayColumns = ['id', 'action', 'subject'];
  public tableOptions: DataTableOptions = {};

  constructor(private readonly _header: HeaderService, private readonly _claimService: ClaimService) {
    this._header.changedHeader(claimsMessages.header);
  }

  public getAll(): Promise<Claim[]> {
    return this._claimService.getAll().toPromise();
  }

  public resolveClaimsSubject(action: ActionKeys, subject: string): string {
    return subjectResolver(action, subject);
  }
}
