import {createSelector} from '@ngrx/store';
import {AppState} from "../../../app.state";
import {RepositoryState} from "./repository.reducer";

export const selectRepository = (state: AppState) => state.repository;

export const selectedPageSelector = createSelector(
  selectRepository,
  (state: RepositoryState) => state.selectedPage
);

export const isPageSelectedSelector = createSelector(
  selectRepository,
  (state: RepositoryState) => state.isPageSelected
);

export const allPages = createSelector(
  selectRepository,
  (state: RepositoryState) => state.pages
);
