import {Page} from "../model/page.model";
import {createReducer, on} from "@ngrx/store";
import * as RepositoryAction from "./repository.actions";


export interface RepositoryState {
  pages: Page[];
  selectedPage: Page | undefined;
  isPageSelected: boolean;
  isAddPageClicked: boolean;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: RepositoryState = {
  error: "",
  selectedPage: undefined,
  pages: [
    // {_id: '61e716d4d4ff42528118ea5e', pageMappingId: '61e716d4d4ff42528118ea5d', projectId: '61d580d86282242f2e9f17b0', releaseId: '61d580d86282242f2e9f17ae', pageName: 'Register', pageDescription: 'Register Page', pageType: 'PAGE', isFrame: false, referenceType: '', referenceValue: '', tags:['register', 'page']},
    // {_id: '61e716d4d4ff42528118ea5f', pageMappingId: '61e716d4d4ff42528118ea5e', projectId: '61d580d86282242f2e9f17b1', releaseId: '61d580d86282242f2e9f17af', pageName: 'Login', pageDescription: 'Login Page', pageType: 'PAGE', isFrame: true, referenceType: 'JSPATH', referenceValue: 'login', tags:['login', 'page']},
    // {_id: '61e716d4d4ff42528118ea5q', pageMappingId: '61e716d4d4ff42528118ea5a', projectId: '61d580d86282242f2e9f17w1', releaseId: '61d580d86282242f2e9f17ad', pageName: 'Dashboard', pageDescription: 'Dashboard Page', pageType: 'PAGE', isFrame: true, referenceType: 'XPATH', referenceValue: 'dashboard', tags:['dashboard', 'page']}
  ],
  isPageSelected: false,
  isAddPageClicked: false,
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
  })),
  on(RepositoryAction.isAddPageClickedAction, (state, {isAddPageClicked} ) => ({
    ...state,
    isAddPageClicked: isAddPageClicked
  })),
  on(RepositoryAction.loadAllPages, (state ) => ({
    ...state
  })),
  on(RepositoryAction.editPageAction, (state, {page} ) => {
    let index = -1;
    if (page) {
      index = state.pages.findIndex(p => p.pageId === page.pageId);
    }

    const updatedPage = {
      ...state.pages[index],
      ...page
    };

    const updatedPages = [...state.pages];
    updatedPages[index] = updatedPage;

    return {
      ...state,
      pages: updatedPages
    };
  }),
  on(RepositoryAction.loadPagesSuccess, (state, { pages }) => ({
    ...state,
    pages: pages,
    error: null,
    status: 'success',
  })),
  // Handle todos load failure
  on(RepositoryAction.loadPagesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
