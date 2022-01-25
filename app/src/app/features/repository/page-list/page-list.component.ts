import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Page} from "./model/page.model";
import {PageService} from "./service/page.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app.state";
import {selectPage} from "../state/repository.actions";

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

  dataSource = new MatTableDataSource<Page>([
    {_id: '61e716d4d4ff42528118ea5e', pageMappingId: '61e716d4d4ff42528118ea5d', projectId: '61d580d86282242f2e9f17b0', releaseId: '61d580d86282242f2e9f17ae', pageName: 'Register', pageDescription: 'Register Page', pageType: 'PAGE', isFrame: false, referenceType: '', referenceValue: '', tags:['login', 'page']},
    {_id: '61e716d4d4ff42528118ea5f', pageMappingId: '61e716d4d4ff42528118ea5e', projectId: '61d580d86282242f2e9f17b1', releaseId: '61d580d86282242f2e9f17af', pageName: 'Login', pageDescription: 'Login Page', pageType: 'PAGE', isFrame: true, referenceType: '/login', referenceValue: 'login', tags:['login', 'page']}
  ]);
  columnsToDisplay = ['pageName'];
  expandedElement: Page | null | undefined;

  constructor(private pageService: PageService, private store: Store) { }

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

  tableExpandHandler(element: any, expandedElement: any) {
    if (expandedElement && (expandedElement === element)) {
      console.log('expand_less');
      // Hide Form
      this.store.dispatch(selectPage({page: undefined}));
    } else {
      console.log('expand_more')
    }

    this.expandedElement = this.expandedElement === element ? null : element;
    this.pageService.selectedPage(element);
    this.store.dispatch(selectPage({page: element}));
  }
}
