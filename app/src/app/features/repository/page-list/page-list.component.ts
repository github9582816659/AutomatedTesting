import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Page} from "./model/page.model";
import {Store} from "@ngrx/store";
import {isPageSelectedAction, selectPageAction} from "../state/repository.actions";
import {AppState} from "../../../app.state";
import * as fromRepository from "../state/repository.selectors";
import {Observable} from "rxjs";

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

  dataSource = new MatTableDataSource<Page>([]);
  allPages$: Observable<Page[]> | undefined;
  columnsToDisplay = ['pageName'];
  expandedElement: Page | null | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
     this.allPages$ = this.store.select<Page[]>(fromRepository.allPages);
     if (this.allPages$) {
       this.allPages$.subscribe((pages:Page[]) => {
         this.dataSource.data = pages;
       })
     }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator;
  }

  tableFilterHandler(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableExpandHandler(element: any, expandedElement: any) {
    if (expandedElement && (expandedElement === element)) {
      this.store.dispatch(isPageSelectedAction({isPageSelected: false}));
    } else {
      this.store.dispatch(isPageSelectedAction({isPageSelected: true}));
    }

    this.expandedElement = this.expandedElement === element ? null : element;
    this.store.dispatch(selectPageAction({page: element}));
  }
}
