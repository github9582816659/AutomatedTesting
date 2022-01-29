import {Component, Input, OnInit} from '@angular/core';
import {Components} from "../../model/component.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.state";
import {clearAllComponents, loadAllComponents} from "../../state/repository.actions";
import {Page} from "../../model/page.model";
import {Observable} from "rxjs";
import * as fromRepository from "../../state/repository.selectors";

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {

  @Input() page!:Page;
  allComponents$!: Observable<Components[]>;
  components: Components[] = []
  isPageSelected$: Observable<boolean> | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log('COMPONENT INIT');

    this.isPageSelected$ = this.store.select<boolean>(fromRepository.isPageSelectedSelector);
    if (this.isPageSelected$) {
      this.isPageSelected$.subscribe((isPageSelected: boolean) => {
        if (!isPageSelected) {
          this.store.dispatch(clearAllComponents());
        } else {
          this.store.dispatch(loadAllComponents({pageId: this.page.pageId}));
          this.allComponents$ = this.store.select<Components[]>(fromRepository.allComponents);
          if (this.allComponents$) {
            this.allComponents$.subscribe((components: Components[]) => {
              this.components = components;
            })
          }
        }
      });
    }
  }

}
