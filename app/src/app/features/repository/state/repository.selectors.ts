import {createSelector} from '@ngrx/store';
import {AppState} from "../../../app.state";
import {RepositoryState} from "./repository.reducer";

export const selectRepository = (state: AppState) => state.repository;
export const selectedPage = () => createSelector(
  selectRepository,
  (state: RepositoryState) => state.selectedPage
);

// export const featureKey = 'repository';
// export const selectRepository = createFeatureSelector<RepositoryState>(featureKey);
// export const selectedPage = () => createSelector(
//   selectRepository,
//   (state) => state.selectedPage
// );
