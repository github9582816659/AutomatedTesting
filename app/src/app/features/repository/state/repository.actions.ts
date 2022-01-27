import {createAction, props} from '@ngrx/store';
import {Page} from "../model/page.model";

export const selectPageAction = createAction(
  '[Repository Page] Select Page',
  props<{ page: Page | undefined }>()
);

export const editPageAction = createAction(
  '[Repository Page] Edit Page',
  props<{ page: Page | undefined }>()
);


export const isPageSelectedAction = createAction(
  '[Repository Page] Is Page Selected',
  props<{ isPageSelected: boolean }>()
);

export const isAddPageClickedAction = createAction(
  '[Repository Page] Add Page Clicked',
  props<{ isAddPageClicked: boolean }>()
);

// ################################################ LOAD ALL PAGES ###########################################
// ###########################################################################################################

export const loadAllPages = createAction(
  '[Repository Page] All Pages'
);

export const loadPagesSuccess = createAction(
  '[Repository Page API] Pages Load Success',
  props<{ pages: Page[] }>()
);

export const loadPagesFailure = createAction(
  '[Repository Page API] Pages Load Failure',
  props<{ error: string }>()
);

// ################################################ SAVE PAGE ################################################
// ###########################################################################################################

export const savePage = createAction(
  '[Repository Page] Save Page',
  props<{ page: Page }>()
);

export const savePageSuccess = createAction(
  '[Repository Page API] Save Page Success',
  props<{ page: Page }>()
);

export const savePageFailure = createAction(
  '[Repository Page API] Save Page Failure',
  props<{ error: string }>()
);

// ################################################ UPDATE PAGE ################################################
// #############################################################################################################

export const updatePage = createAction(
  '[Repository Page] Update Page',
  props<{ pageId: string, page: Page }>()
);

export const updatePageSuccess = createAction(
  '[Repository Page API] Update Page Success',
  props<{ page: Page }>()
);

export const updatePageFailure = createAction(
  '[Repository Page API] Update Page Failure',
  props<{ error: string }>()
);

// ################################################ DELETE PAGE ################################################
// #############################################################################################################

export const deletePage = createAction(
  '[Repository Page] Delete Page',
  props<{ pageId: string }>()
);

export const deletePageSuccess = createAction(
  '[Repository Page API] Delete Page Success',
  props<{ deleted: string }>()
);

export const deletePageFailure = createAction(
  '[Repository Page API] Delete Page Failure',
  props<{ error: string }>()
);
