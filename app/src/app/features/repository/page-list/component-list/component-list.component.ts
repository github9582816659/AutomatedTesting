import {Component, Input, OnInit} from '@angular/core';
import {Components} from "../../model/component.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.state";
import {
  componentSelectedAction,
  isAddComponentClickedAction,
  isAddPageClickedAction,
  isComponentSelectedAction,
  isPageSelectedAction,
  loadAllComponentsAction,
  pageSelectedAction
} from "../../state/repository.actions";
import {Page} from "../../model/page.model";
import {Observable} from "rxjs";
import * as fromRepository from "../../state/repository.selectors";

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {

  @Input() element!: Page | null;
  allComponents$: Observable<Components[]> = this.store.select<Components[]>(fromRepository.selectAllComponents);
  components: Components[] = []
  isPageSelected$: Observable<boolean> | undefined;
  isLoading$: Observable<"pending" | "loading" | "success" | "error"> = this.store.select<"pending" | "loading" | "success" | "error">(fromRepository.selectComponentStatus);

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    this.store.select<boolean>(fromRepository.selectIsPageSelected).subscribe(isPageSelected => {
      if (isPageSelected) {
        const pageId = this.element?.pageId;
        if (pageId) {
          this.store.dispatch(loadAllComponentsAction({pageId: pageId}));
        }
      } else {
        this.element = null;
      }
    });

  }

  componentClickHandler(component: Components) {
    this.store.dispatch(componentSelectedAction({selected: true, component: component}));
  }

  addComponentHandler() {
    this.store.dispatch(isComponentSelectedAction({isComponentSelected: false}));
    this.store.dispatch(isAddComponentClickedAction({isAddComponentClicked: true}));
  }
}
