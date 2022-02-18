import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ProductService } from '../product.service';
import { Product } from '../entities/product';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import {TooltipPosition} from '@angular/material/tooltip';

import {FormControl} from '@angular/forms';

import { NEVER, observable, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export class User {
  constructor(public firstname: string, public lastname: string, public selected?: boolean) {
    if (selected === undefined) selected = false;
  }
}

interface selectArr {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsComponent implements OnInit {

  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];

  // table filter show hide div
  tableFilterMenuID = false;
  tableFilterMenuCompany = false;
  tableFilterMenuStreet = false;
  tableFilterMenuCity = false;
  tableFilterMenuState  = false;
  tableFilterMenuCountry = false;
  tableFilterMenuPostal = false;
  tableFilterMenuMatchType = false;
  equalsOk = false;

  selectArr: selectArr[] = [
    {value: 'steak-0', viewValue: 'Select'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  selected = 'steak-0';

  // more filters show and hide
  showMoreFilters = false;

  // apply filters add boxes
  applyFilters = false;
  
  // close id quals tab
  eqTab = true;

  userControl = new FormControl();

  users = [
    new User('Misha', 'Arnold'),
    new User('Felix', 'Godines'),
    new User('Odessa', 'Thorton'),
    new User('Julianne', 'Gills'),
    new User('Virgil', 'Hommel'),
    new User('Justa', 'Betts'),
    new User('Keely', 'Millington'),
    new User('Blanca', 'Winzer'),
    new User('Alejandrina', 'Pallas'),
    new User('Rosy', 'Tippins'),
    new User('Winona', 'Kerrick'),
    new User('Reynaldo', 'Orchard'),
    new User('Shawn', 'Counce'),
    new User('Shemeka', 'Wittner'),
    new User('Sheila', 'Sak'),
    new User('Zola', 'Rodas'),
    new User('Dena', 'Heilman'),
    new User('Concepcion', 'Pickrell'),
    new User('Marylynn', 'Berthiaume'),
    new User('Howard', 'Lipton'),
    new User('Maxine', 'Amon'),
    new User('Iliana', 'Steck'),
    new User('Laverna', 'Cessna'),
    new User('Brittany', 'Rosch'),
    new User('Esteban', 'Ohlinger'),
    new User('Myron', 'Cotner'),
    new User('Geri', 'Donner'),
    new User('Minna', 'Ryckman'),
    new User('Yi', 'Grieco'),
    new User('Lloyd', 'Sneed'),
    new User('Marquis', 'Willmon'),
    new User('Lupita', 'Mattern'),
    new User('Fernande', 'Shirk'),
    new User('Eloise', 'Mccaffrey'),
    new User('Abram', 'Hatter'),
    new User('Karisa', 'Milera'),
    new User('Bailey', 'Eno'),
    new User('Juliane', 'Sinclair'),
    new User('Giselle', 'Labuda'),
    new User('Chelsie', 'Hy'),
    new User('Catina', 'Wohlers'),
    new User('Edris', 'Liberto'),
    new User('Harry', 'Dossett'),
    new User('Yasmin', 'Bohl'),
    new User('Cheyenne', 'Ostlund'),
    new User('Joannie', 'Greenley'),
    new User('Sherril', 'Colin'),
    new User('Mariann', 'Frasca'),
    new User('Sena', 'Henningsen'),
    new User('Cami', 'Ringo')
  ];

  selectedUsers: User[] = new Array<User>();

  filteredUsers: Observable<User[]> = new Observable<User[]>();
  lastFilter: string = '';


  dataSource :any;
  products : Product[] = []; 
  showIdHeaderFilter = true; 
  columnsToDisplay = ['dropDown', 'Id', 'companyName', 'streetNo', 'streetName','City','State','Country','Postal','MatchType','Action'];
  expandedElement?: Product | null;
  productDataSource = new MatTableDataSource<any>();
  constructor(private productService : ProductService) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(
      (response:Product[])=>{this.products = response; 
        console.log('Products :', this.products);
      //  this.dataSource = this.products;
      this.productDataSource = new MatTableDataSource(response);
      },
      (error:any)=>{console.log(error)}
      )

    
      this.filteredUsers = this.userControl.valueChanges.pipe(
        startWith<string | User[]>(''),
        map(value => typeof value === 'string' ? value : this.lastFilter),
        map(filter => this.filter(filter))
      );

  }

 

  drop(event: CdkDragDrop<string[]>) {
    console.log("hey");
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
  }

  showIdHeader(){
    this.showIdHeaderFilter = !this.showIdHeaderFilter;
  }


  filter(filter: string): User[] {
    this.lastFilter = filter;
    if (filter) {
      return this.users.filter(option => {
        return option.firstname.toLowerCase().indexOf(filter.toLowerCase()) >= 0
          || option.lastname.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      })
    } else {
      return this.users.slice();
    }
  }

  displayFn(value: User[] | string): string | undefined {
    let displayValue: string = '';
    if (Array.isArray(value)) {
      value.forEach((user, index) => {
        if (index === 0) {
          displayValue = user.firstname + ' ' + user.lastname;
        } else {
          displayValue += ', ' + user.firstname + ' ' + user.lastname;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked(event: Event, user: User) {
    event.stopPropagation();
    this.toggleSelection(user);
  }

  toggleSelection(user: User) {
    user.selected = !user.selected;
    if (user.selected) {
      this.selectedUsers.push(user);
    } else {
      const i = this.selectedUsers.findIndex(value => value.firstname === user.firstname && value.lastname === user.lastname);
      this.selectedUsers.splice(i, 1);
    }

    this.userControl.setValue(this.selectedUsers);
  }

}
