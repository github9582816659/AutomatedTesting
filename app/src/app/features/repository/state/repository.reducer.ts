import {Page} from "../page-list/model/page.model";
import {createReducer, on} from "@ngrx/store";
import * as RepositoryAction from "./repository.actions";


export interface RepositoryState {
  pages: Page[];
  selectedPage: Page | undefined;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: RepositoryState = {
  error: "",
  selectedPage: undefined,
  pages: [],
  status: 'pending'
};

export const repositoryReducer = createReducer(
  // Supply the initial state
  initialState,
  on(RepositoryAction.selectPage, (state, {page} ) => ({
    ...state,
    selectedPage: page
  }))
);
