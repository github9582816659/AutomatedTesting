import { createAction, props } from '@ngrx/store';
import {Page} from "../model/page.model";

export const selectPageAction = createAction(
  '[Repository Page] Select Page',
  props<{ page: Page | undefined}>()
);

export const editPageAction = createAction(
  '[Repository Page] Edit Page',
  props<{ page: Page | undefined}>()
);


export const isPageSelectedAction = createAction(
  '[Repository Page] Is Page Selected',
  props<{ isPageSelected: boolean}>()
);

export const isAddPageClickedAction = createAction(
  '[Repository Page] Add Page Clicked',
  props<{ isAddPageClicked: boolean}>()
);

export const allPages = createAction(
  '[Repository Page] All Pages'
);


