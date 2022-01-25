import {Page} from "../page-list/model/page.model";
import {createReducer, on} from "@ngrx/store";
import * as RepositoryAction from "./repository.actions";


export interface RepositoryState {
  pages: Page[];
  selectedPage: Page | undefined;
  isPageSelected: boolean;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: RepositoryState = {
  error: "",
  selectedPage: undefined,
  pages: [],
  isPageSelected: false,
  status: 'pending'
};

export const repositoryReducer = createReducer(
  // Supply the initial state
  initialState,
  on(RepositoryAction.selectPageAction, (state, {page} ) => ({
    ...state,
    selectedPage: page
  })),
  on(RepositoryAction.isPageSelectedAction, (state, {isPageSelected} ) => ({
    ...state,
    isPageSelected: isPageSelected
  }))
);
