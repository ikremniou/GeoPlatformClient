import { Component, OnInit } from '@angular/core';
import { DataTableConsumer } from 'src/app/misc/data-table/data-table-consumer';
import { DataTableOptions } from 'src/app/misc/data-table/data-table-options';
import { Claim } from 'src/app/models/claim.model';
import { ClaimService } from 'src/app/services/claim/claim.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.sass']
})
export class ClaimsComponent implements DataTableConsumer<Claim> {
  public entityClass = Claim;
  public displayColumns = ['id', 'action', 'subject'];
  public tableOptions: DataTableOptions = { };

  constructor(private readonly claimService: ClaimService) { }
  public getAll(): Promise<Claim[]> {
    return this.claimService.getAll().toPromise();
  }
}
