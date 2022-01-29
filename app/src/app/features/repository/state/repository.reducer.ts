import {Page} from "../model/page.model";
import {createReducer, on} from "@ngrx/store";
import * as RepositoryAction from "./repository.actions";
import {Components} from "../model/component.model";


export interface RepositoryState {
  // PAGES
  pages: Page[];
  selectedPage: Page | undefined;
  isPageSelected: boolean;
  isAddPageClicked: boolean;

  // COMPONENTS
  components: Components[],

  // API STATUS
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: RepositoryState = {
  // PAGES
  pages: [],
  selectedPage: undefined,
  isPageSelected: false,
  isAddPageClicked: false,


  // COMPONENTS
  components: [],

  // API STATUS
  error: "",
  status: 'pending'
};

export const repositoryReducer = createReducer(
  // Supply the initial state
  initialState,

  // ############################################# PAGES #############################################
  // #################################################################################################

  // EVENTS
  on(RepositoryAction.selectPageAction, (state, {page}) => ({
    ...state,
    selectedPage: page
  })),
  on(RepositoryAction.isPageSelectedAction, (state, {isPageSelected}) => {
    return {
      ...state,
      isPageSelected: isPageSelected
    }
  }),
  on(RepositoryAction.isAddPageClickedAction, (state, {isAddPageClicked}) => ({
    ...state,
    isAddPageClicked: isAddPageClicked
  })),

  // LOAD
  on(RepositoryAction.loadPagesSuccess, (state, {pages}) => ({
    ...state,
    pages: pages,
    error: null,
    status: 'success',
  })),
  on(RepositoryAction.loadPagesFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // SAVE
  on(RepositoryAction.savePageSuccess, (state, {page}) => ({
    ...state,
    pages: [...state.pages, page],
    error: null,
    status: 'success',
  })),
  on(RepositoryAction.savePageFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // UPDATE
  on(RepositoryAction.updatePageSuccess, (state, {page}) => {
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
  on(RepositoryAction.updatePageFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // DELETE
  on(RepositoryAction.deletePageSuccess, (state, {pageId}) => ({
    ...state,
    pages: state.pages.filter((page) => {
      return page.pageId !== pageId
    }),
    error: null,
    status: 'success',
  })),
  on(RepositoryAction.deletePageFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  })),


  // ########################################## COMPONENTS ###########################################
  // #################################################################################################

  on(RepositoryAction.loadComponentsSuccess, (state, {components}) => ({
    ...state,
    components: components,
    error: null,
    status: 'success',
  })),
  on(RepositoryAction.clearAllComponents, (state) => ({
    ...state,
    components: [],
  })),
  on(RepositoryAction.loadComponentsFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error',
  })),
);
