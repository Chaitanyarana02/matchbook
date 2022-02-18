import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter, map } from 'rxjs';
import { ProductService } from '../product.service';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit, OnChanges {

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];

  @Input() Id: any; 
  columnsToDisplay = ['Id','DUNS', 'companyName', 'streetNo', 'streetName','City','State','Postal','Role','Status','MatchType'];
  providerDataSource = new  MatTableDataSource<any>();
  constructor(private pService : ProductService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.Id);
      this.pService.getProviders(this.Id).pipe(map((data:any) => data.filter( (res:any) => res.Id === this.Id)))
      .subscribe(
        (data:any)=>{
           console.log(data);
           this.providerDataSource = new MatTableDataSource(data);
        },
        (error:any)=>{
          console.log(error);
        }
      )

  }

}
