import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of} from "rxjs";
import * as RepositoryAction from "./repository.actions";
import {RepositoryService} from "../service/repository.service";
import {Page} from "../model/page.model";
import {AppState} from "../../../app.state";
import {Store} from "@ngrx/store";
import {Components} from "../model/component.model";

@Injectable()
export class RepositoryEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private repositoryService: RepositoryService
  ) {}

  // ############################################# PAGES #############################################
  // #################################################################################################

  loadAllPages$ = createEffect(() => this.actions$.pipe(
      ofType(RepositoryAction.loadAllPagesAction),
      mergeMap(() => this.repositoryService.loadAllPages()
        .pipe(
          map((pages:Page[]) => RepositoryAction.loadPagesSuccess({pages: pages})),
          catchError((error) => of(RepositoryAction.loadPagesFailure({pageError: error})))
        ))
    )
  );
  //
  savePage$ = createEffect(() => this.actions$.pipe(
      ofType(RepositoryAction.savePageAction),
      mergeMap((action) => this.repositoryService.savePage(action.page)
        .pipe(
          map((page:Page) => RepositoryAction.savePageSuccessAction({page: page})),
          catchError((error) => of(RepositoryAction.savePageFailureAction({pageError: error})))
        ))
    )
  );

  updatePage$ = createEffect(() => this.actions$.pipe(
      ofType(RepositoryAction.updatePageAction),
      mergeMap((action) => this.repositoryService.updatePage(action.pageId, action.page)
        .pipe(
          map((page:Page) => RepositoryAction.updatePageSuccessAction({page: page})),
          catchError((error) => of(RepositoryAction.updatePageFailureAction({pageError: error})))
        ))
    )
  );

  deletePage$ = createEffect(() => this.actions$.pipe(
      ofType(RepositoryAction.deletePageAction),
      mergeMap((action) => this.repositoryService.deletePage(action.pageId)
        .pipe(
          map((result) => RepositoryAction.deletePageSuccessAction({pageId: result.pageId})),
          catchError((error) => of(RepositoryAction.deletePageFailureAction({pageError: error})))
        ))
    )
  );


  // ########################################## COMPONENTS ###########################################
  // #################################################################################################

  loadAllComponents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoryAction.loadAllComponentsAction),
      mergeMap((action) => this.repositoryService.loadAllComponents(action.pageId)
        .pipe(
          map((components:Components[]) => RepositoryAction.loadComponentsSuccessAction({components: components})),
          catchError((error) => of(RepositoryAction.loadComponentsFailureAction({componentError: error})))
        ))
    )
  );

  saveComponent$ = createEffect(() => this.actions$.pipe(
      ofType(RepositoryAction.saveComponentAction),
      mergeMap((action) => this.repositoryService.saveComponent(action.component)
        .pipe(
          map((component:Components) => RepositoryAction.saveComponentSuccessAction({component: component})),
          catchError((error) => of(RepositoryAction.saveComponentFailureAction({componentError: error})))
        ))
    )
  );

  updateComponent$ = createEffect(() => this.actions$.pipe(
      ofType(RepositoryAction.updateComponentAction),
      mergeMap((action) => this.repositoryService.updateComponent(action.componentId, action.component)
        .pipe(
          map((component:Components) => RepositoryAction.updateComponentSuccessAction({component: component})),
          catchError((error) => of(RepositoryAction.updateComponentFailureAction({componentError: error})))
        ))
    )
  );

}
