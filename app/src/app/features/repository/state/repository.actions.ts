import {createAction, props} from '@ngrx/store';
import {Page} from "../model/page.model";
import {Components} from "../model/component.model";


// ##################################################  EVENTS  ###############################################
// ###########################################################################################################

export const pageSelectedAction = createAction(
  '[REPOSITORY PAGE] Select Page',
  props<{ selected: boolean, page: Page | null }>()
);

export const pageDeSelectedAction = createAction(
  '[REPOSITORY PAGE] UnSelect Page'
);

export const isPageSelectedAction = createAction(
  '[REPOSITORY PAGE] Is Page Selected',
  props<{ isPageSelected: boolean }>()
);

export const isAddPageClickedAction = createAction(
  '[REPOSITORY PAGE] Is Add Page Clicked',
  props<{ isAddPageClicked: boolean }>()
);

// ################################################ LOAD ALL PAGES ###########################################
// ###########################################################################################################

export const loadAllPagesAction = createAction(
  '[REPOSITORY PAGE] Load All Pages'
);

export const loadPagesSuccess = createAction(
  '[REPOSITORY PAGE API] Pages Load Success',
  props<{ pages: Page[] }>()
);

export const loadPagesFailure = createAction(
  '[REPOSITORY PAGE API] Pages Load Failure',
  props<{ pageError: string }>()
);

// ################################################ SAVE PAGE ################################################
// ###########################################################################################################

export const savePageAction = createAction(
  '[REPOSITORY PAGE] Save Page',
  props<{ page: Page }>()
);

export const savePageSuccessAction = createAction(
  '[REPOSITORY PAGE API] Save Page Success',
  props<{ page: Page }>()
);

export const savePageFailureAction = createAction(
  '[REPOSITORY PAGE API] Save Page Failure',
  props<{ pageError: string }>()
);

// ################################################ UPDATE PAGE ################################################
// #############################################################################################################

export const updatePageAction = createAction(
  '[REPOSITORY PAGE] Update Page',
  props<{ pageId: string, page: Page }>()
);

export const updatePageSuccessAction = createAction(
  '[REPOSITORY PAGE API] Update Page Success',
  props<{ page: Page }>()
);

export const updatePageFailureAction = createAction(
  '[REPOSITORY PAGE API] Update Page Failure',
  props<{ pageError: string }>()
);

// ################################################ DELETE PAGE ################################################
// #############################################################################################################

export const deletePageAction = createAction(
  '[REPOSITORY PAGE] Delete Page',
  props<{ pageId: string }>()
);

export const deletePageSuccessAction = createAction(
  '[REPOSITORY PAGE API] Delete Page Success',
  props<{ pageId: string }>()
);

export const deletePageFailureAction = createAction(
  '[REPOSITORY PAGE API] Delete Page Failure',
  props<{ pageError: string }>()
);


// ################################################ LOAD ALL COMPONENTS ######################################
// ###########################################################################################################

export const loadAllComponentsAction = createAction(
  '[Repository Component] Load All Components with PageID',
  props<{ pageId: string }>()
);

export const loadComponentsSuccessAction = createAction(
  '[Repository Component API] Components Load Success',
  props<{ components: Components[] }>()
);

export const loadComponentsFailureAction = createAction(
  '[Repository Component API] Components Load Failure',
  props<{ componentError: string }>()
);


export const componentSelectedAction = createAction(
  '[REPOSITORY COMPONENT] Select Component',
  props<{ selected: boolean, component: Components | null }>()
);

// ################################################ SAVE COMPONENT ################################################
// ###########################################################################################################

export const saveComponentAction = createAction(
  '[REPOSITORY COMPONENT] Save Component',
  props<{ component: Components }>()
);

export const saveComponentSuccessAction = createAction(
  '[REPOSITORY COMPONENT API] Save Component Success',
  props<{ component: Components }>()
);

export const saveComponentFailureAction = createAction(
  '[REPOSITORY COMPONENT API] Save Component Failure',
  props<{ componentError: string }>()
);


// ################################################ UPDATE COMPONENT ################################################
// #############################################################################################################

export const updateComponentAction = createAction(
  '[REPOSITORY COMPONENT] Update Component',
  props<{ componentId: string, component: Components }>()
);

export const updateComponentSuccessAction = createAction(
  '[REPOSITORY COMPONENT API] Update Component Success',
  props<{ component: Components }>()
);

export const updateComponentFailureAction = createAction(
  '[REPOSITORY COMPONENT API] Update Component Failure',
  props<{ componentError: string }>()
);


// ################################################ DELETE COMPONENT ################################################
// #############################################################################################################

export const deleteComponentAction = createAction(
  '[REPOSITORY COMPONENT] Delete Component',
  props<{ componentId: string }>()
);

export const deleteComponentSuccessAction = createAction(
  '[REPOSITORY COMPONENT API] Delete Component Success',
  props<{ componentId: string }>()
);

export const deleteComponentFailureAction = createAction(
  '[REPOSITORY COMPONENT API] Delete Component Failure',
  props<{ componentError: string }>()
);
