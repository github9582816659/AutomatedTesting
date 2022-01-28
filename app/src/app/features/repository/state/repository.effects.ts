import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of, withLatestFrom} from "rxjs";
import * as RepositoryAction from "./repository.actions";
import {RepositoryService} from "../service/repository.service";
import {Page} from "../model/page.model";
import {loadAllPages} from "./repository.actions";
import {AppState} from "../../../app.state";
import {Store} from "@ngrx/store";

@Injectable()
export class RepositoryEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private repositoryService: RepositoryService
  ) {}

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
      mergeMap((acition) => this.repositoryService.updatePage(acition.pageId, acition.page)
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
          map(() => RepositoryAction.deletePageSuccess({deleted: 'success'})),
          catchError((error) => of(RepositoryAction.deletePageFailure({error: error})))
        ))
    )
  );

}
