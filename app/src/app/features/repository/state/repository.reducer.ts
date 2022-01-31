import {Page} from "../model/page.model";
import {createReducer, on} from "@ngrx/store";
import * as RepositoryAction from "./repository.actions";
import {Components} from "../model/component.model";
import {
  //pageSelected, pageUnSelected
} from "./repository.actions";


export interface RepositoryState {
  // PAGES
  pages: Page[];
  selectedPage: Page | null;
  isPageSelected: boolean;
  isAddPageClicked: boolean;
  pageError: string | null;
  pageStatus: 'pending' | 'loading' | 'error' | 'success';

  // COMPONENTS
  components: Components[],
  isComponentSelected: boolean,
  selectedComponent: Components | null;
  componentError: string | null;
  componentStatus: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: RepositoryState = {
  // PAGES
  pages: [],
  selectedPage: null,
  isPageSelected: false,
  isAddPageClicked: false,
  pageError: "",
  pageStatus: 'pending',


  // COMPONENTS
  components: [],
  isComponentSelected: false,
  selectedComponent: null,
  componentError: "",
  componentStatus: 'pending'

};

export const repositoryReducer = createReducer(
  // Supply the initial state
  initialState,

  // ############################################# PAGES #############################################
  // #################################################################################################

  // EVENTS
  on(RepositoryAction.pageSelectedAction, (state, {selected, page}) => ({
    ...state,
    isPageSelected: selected,
    selectedPage: page,
    components: []
  })),
  on(RepositoryAction.pageDeSelectedAction, (state) => ({
    ...state,
    selectedPage: null,
    isPageSelected: false,
    selectedComponent: null,
    isComponentSelected: false,
    componentStatus: 'pending',
    components: []
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
  on(RepositoryAction.loadPagesSuccess, (state, {pages}) => ({
    ...state,
    pages: pages,
    pageError: null,
    pageStatus: 'success',
  })),
  on(RepositoryAction.loadPagesFailure, (state, {pageError}) => ({
    ...state,
    pageError: pageError,
    pageStatus: 'error',
  })),
  on(RepositoryAction.savePageSuccessAction, (state, {page}) => ({
    ...state,
    pages: [...state.pages, page],
    pageError: null,
    pageStatus: 'success',
  })),
  on(RepositoryAction.savePageFailureAction, (state, {pageError}) => ({
    ...state,
    pageError: pageError,
    pageStatus: 'error',
  })),
  on(RepositoryAction.updatePageSuccessAction, (state, {page}) => {
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
  on(RepositoryAction.updatePageFailureAction, (state, {pageError}) => ({
    ...state,
    pageError: pageError,
    pageStatus: 'error',
  })),
  on(RepositoryAction.deletePageSuccessAction, (state, {pageId}) => ({
    ...state,
    pages: state.pages.filter((page) => {
      return page.pageId !== pageId
    }),
    pageError: null,
    pageStatus: 'success',
  })),
  on(RepositoryAction.deletePageFailureAction, (state, {pageError}) => ({
    ...state,
    pageError: pageError,
    pageStatus: 'error',
  })),


  // ########################################## COMPONENTS ###########################################
  // #################################################################################################

  on(RepositoryAction.loadAllComponentsAction, (state) => ({
    ...state,
    componentStatus: 'loading',
  })),
  on(RepositoryAction.loadComponentsSuccessAction, (state, {components}) => ({
    ...state,
    components: components,
    componentError: null,
    componentStatus: 'success',
  })),
  on(RepositoryAction.loadComponentsFailureAction, (state, {componentError}) => ({
    ...state,
    componentError: componentError,
    componentStatus: 'error',
  })),
  on(RepositoryAction.componentSelectedAction, (state, {selected, component}) => ({
    ...state,
    isComponentSelected: selected,
    selectedComponent: component,
  })),
);
