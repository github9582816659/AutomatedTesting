import {createSelector} from '@ngrx/store';
import {AppState} from "../../../app.state";
import {RepositoryState} from "./repository.reducer";

export const selectRepository = (state: AppState) => state.repository;

export const selectSelectedPage = createSelector(
  selectRepository,
  (state: RepositoryState) => state.selectedPage
);

export const selectIsPageSelected = createSelector(
  selectRepository,
  (state: RepositoryState) => state.isPageSelected
);

export const selectIsAddPageClicked = createSelector(
  selectRepository,
  (state: RepositoryState) => state.isAddPageClicked
);

export const selectAllPages = createSelector(
  selectRepository,
  (state: RepositoryState) => state.pages
);


export const selectAllComponents = createSelector(
  selectRepository,
  (state: RepositoryState) => state.components
);

export const selectComponentStatus = createSelector(
  selectRepository,
  (state: RepositoryState) => state.componentStatus
);

export const selectComponentError = createSelector(
  selectRepository,
  (state: RepositoryState) => state.componentError
);

export const selectIsComponentSelected = createSelector(
  selectRepository,
  (state: RepositoryState) => state.isComponentSelected
);

export const selectSelectedComponent = createSelector(
  selectRepository,
  (state: RepositoryState) => state.selectedComponent
);

export const selectIsAddComponentClicked = createSelector(
  selectRepository,
  (state: RepositoryState) => state.isAddComponentClicked
);
