import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of, withLatestFrom} from "rxjs";
import * as RepositoryAction from "./repository.actions";
import {RepositoryService} from "../service/repository.service";
import {Page} from "../model/page.model";
import {loadAllPages} from "./repository.actions";
import {AppState} from "../../../app.state";
import {Store} from "@ngrx/store";
import {Components} from "../model/component.model";
import {isPageSelectedSelector} from "./repository.selectors";

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
      ofType(RepositoryAction.loadAllPages),
      mergeMap(() => this.repositoryService.loadAllPages()
        .pipe(
          map((pages:Page[]) => RepositoryAction.loadPagesSuccess({pages: pages})),
          catchError((error) => of(RepositoryAction.loadPagesFailure({error: error})))
        ))
    )
  );

  savePage$ = createEffect(() => this.actions$.pipe(
      ofType(RepositoryAction.savePage),
      mergeMap((action) => this.repositoryService.savePage(action.page)
        .pipe(
          map((page:Page) => RepositoryAction.savePageSuccess({page: page})),
          catchError((error) => of(RepositoryAction.savePageFailure({error: error})))
        ))
    )
  );

  updatePage$ = createEffect(() => this.actions$.pipe(
      ofType(RepositoryAction.updatePage),
      mergeMap((action) => this.repositoryService.updatePage(action.pageId, action.page)
        .pipe(
          map((page:Page) => RepositoryAction.updatePageSuccess({page: page})),
          catchError((error) => of(RepositoryAction.updatePageFailure({error: error})))
        ))
    )
  );

  deletePage$ = createEffect(() => this.actions$.pipe(
      ofType(RepositoryAction.deletePage),
      mergeMap((action) => this.repositoryService.deletePage(action.pageId)
        .pipe(
          map((result) => RepositoryAction.deletePageSuccess({pageId: result.pageId})),
          catchError((error) => of(RepositoryAction.deletePageFailure({error: error})))
        ))
    )
  );


  // ########################################## COMPONENTS ###########################################
  // #################################################################################################

  loadAllComponents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoryAction.loadAllComponents),
      mergeMap((action) => this.repositoryService.loadAllComponents(action.pageId)
        .pipe(
          map((components:Components[]) => RepositoryAction.loadComponentsSuccess({components: components})),
          catchError((error) => of(RepositoryAction.loadComponentsFailure({error: error})))
        ))
    )
  );

}
