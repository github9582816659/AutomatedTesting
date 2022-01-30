import {createAction, props} from '@ngrx/store';
import {Page} from "../model/page.model";
import {Components} from "../model/component.model";


// ##################################################  EVENTS  ###############################################
// ###########################################################################################################

// export const selectPageAction = createAction(
//   '[Repository Page] Select Page',
//   props<{ page: Page }>()
// );

export const pageSelectedAction = createAction(
  '[REPOSITORY PAGE] SELECT PAGE',
  props<{ selected: boolean, page: Page | null }>()
);

export const pageDeSelectedAction = createAction(
  '[REPOSITORY PAGE] UNSELECT PAGE'
);
//
// export const clearSelectedPage = createAction(
//   '[Repository Page] Clear Select Page'
// );
//
export const isPageSelectedAction = createAction(
  '[Repository Page] Is Page Selected',
  props<{ isPageSelected: boolean }>()
);

export const isAddPageClickedAction = createAction(
  '[Repository Page] Is Add Page Clicked',
  props<{ isAddPageClicked: boolean }>()
);

// ################################################ LOAD ALL PAGES ###########################################
// ###########################################################################################################

export const loadAllPagesAction = createAction(
  '[REPOSITORY PAGE] LOAD ALL PAGES'
);

export const loadPagesSuccess = createAction(
  '[Repository Page API] Pages Load Success',
  props<{ pages: Page[] }>()
);

export const loadPagesFailure = createAction(
  '[Repository Page API] Pages Load Failure',
  props<{ pageError: string }>()
);

// ################################################ SAVE PAGE ################################################
// ###########################################################################################################

export const savePageAction = createAction(
  '[Repository Page] Save Page',
  props<{ page: Page }>()
);

export const savePageSuccessAction = createAction(
  '[Repository Page API] Save Page Success',
  props<{ page: Page }>()
);

export const savePageFailureAction = createAction(
  '[Repository Page API] Save Page Failure',
  props<{ pageError: string }>()
);

// ################################################ UPDATE PAGE ################################################
// #############################################################################################################

export const updatePageAction = createAction(
  '[Repository Page] Update Page',
  props<{ pageId: string, page: Page }>()
);

export const updatePageSuccessAction = createAction(
  '[Repository Page API] Update Page Success',
  props<{ page: Page }>()
);

export const updatePageFailureAction = createAction(
  '[Repository Page API] Update Page Failure',
  props<{ pageError: string }>()
);

// ################################################ DELETE PAGE ################################################
// #############################################################################################################

export const deletePageAction = createAction(
  '[Repository Page] Delete Page',
  props<{ pageId: string }>()
);

export const deletePageSuccessAction = createAction(
  '[Repository Page API] Delete Page Success',
  props<{ pageId: string }>()
);

export const deletePageFailureAction = createAction(
  '[Repository Page API] Delete Page Failure',
  props<{ pageError: string }>()
);


// ################################################ LOAD ALL COMPONENTS ######################################
// ###########################################################################################################

export const loadAllComponentsAction = createAction(
  '[Repository Component] Load All Components with PageID',
  props<{ pageId: string }>()
);
// export const clearAllComponents = createAction(
//   '[Repository Component] Clear All Components'
// );
//
export const loadComponentsSuccessAction = createAction(
  '[Repository Component API] Components Load Success',
  props<{ components: Components[] }>()
);

export const loadComponentsFailureAction = createAction(
  '[Repository Component API] Components Load Failure',
  props<{ componentError: string }>()
);

