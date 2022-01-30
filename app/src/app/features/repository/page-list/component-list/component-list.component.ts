import {Component, Input, OnInit} from '@angular/core';
import {Components} from "../../model/component.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app.state";
import {
  loadAllComponentsAction
  // clearAllComponents,
  // isPageSelectedAction,
  // loadAllComponents
} from "../../state/repository.actions";
import {Page} from "../../model/page.model";
import {Observable} from "rxjs";
import * as fromRepository from "../../state/repository.selectors";
import {selectIsPageSelected} from "../../state/repository.selectors";

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

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    // this.isPageSelected$ = this.store.select<boolean>(fromRepository.isPageSelectedSelector);
    // if (this.isPageSelected$) {
    //   this.isPageSelected$.subscribe((isPageSelected: boolean) => {
    //     if (!isPageSelected) {
    //       console.log('COMPONENT : PAGE IS NOT SELECTED DISPATCHING CLEAR ALL COMPONENT')
    //       this.store.dispatch(clearAllComponents());
    //     } else {
    //       console.log('COMPONENT : PAGE IS SELECTED DISPATCHING LOAD ALL COMPONENT')
    //       this.store.dispatch(loadAllComponents({pageId: this.page.pageId}));
    //       this.allComponents$ = this.store.select<Components[]>(fromRepository.allComponents);
    //       if (this.allComponents$) {
    //         this.allComponents$.subscribe((components: Components[]) => {
    //           console.log('COMPONENT : LOAD ALL COMPONENT SUCCESS')
    //           this.components = components;
    //         }, error => {
    //           console.log('COMPONENT : LOAD ALL COMPONENT ERROR')
    //         })
    //       }
    //     }
    //   });
    // }
    console.log('************ COMPONENT LIST INIT ************' + this.element?.pageId);
    this.store.select<boolean>(fromRepository.selectIsPageSelected).subscribe(isPageSelected => {
      console.log('COMPONENT LIST -> PAGE SELECTOR ');
      if (isPageSelected) {
        console.log('COMPONENT : PAGE IS SELECTED DISPATCHING LOAD ALL COMPONENTS FOR PAGE ' + this.element?.pageName + ' PAGE ID ' + this.element?.pageId);
        const pageId = this.element?.pageId;
        console.log('PAGE ID --------> ' + pageId)
        if (pageId) {
          console.log('DISPATCHING PAGE ID --------> ' + pageId)
          this.store.dispatch(loadAllComponentsAction({pageId: pageId}));
        }

      } else {
        console.log('COMPONENT : PAGE IS NOT SELECTED DISPATCHING CLEAR ALL COMPONENT');
        //this.store.dispatch(clearAllComponents());
        this.element = null;
      }
    });


    // this.store.select<Components[]>(fromRepository.selectAllComponents).subscribe((components: Components[]) => {
    //   console.log('COMPONENT : LOAD ALL COMPONENT SUCCESS')
    //   this.components = components;
    // }, error => {
    //   console.log('COMPONENT : LOAD ALL COMPONENT ERROR')
    // });

  }

}
