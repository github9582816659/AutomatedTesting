import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Register'
  },
  {
    position: 2,
    name: 'Login'
  },
  {
    position: 3,
    name: 'Dashboard'
  },
  {
    position: 4,
    name: 'About'
  },
  {
    position: 5,
    name: 'Contact Us'
  },
  {
    position: 6,
    name: 'Profile'
  },
  {
    position: 7,
    name: 'Logout'
  },
  {
    position: 8,
    name: 'Notification'
  },
  {
    position: 9,
    name: 'Block'
  },
  {
    position: 10,
    name: 'Allow'
  },
  {
    position: 11,
    name: 'Test'
  },
  {
    position: 12,
    name: 'Control'
  },
  {
    position: 13,
    name: 'Page 13'
  },
  {
    position: 14,
    name: 'Page 14'
  },
  {
    position: 15,
    name: 'Page 15'
  }
];

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PageListComponent implements OnInit,AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  columnsToDisplay = ['name'];
  expandedElement: PeriodicElement | null | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator;
  }

  tableFilterHandler(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
