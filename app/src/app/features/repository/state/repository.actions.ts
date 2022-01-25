import { createAction, props } from '@ngrx/store';
import {Page} from "../page-list/model/page.model";

export const selectPageAction = createAction(
  '[Repository Page] Select Page',
  props<{ page: Page | undefined}>()
);

export const isPageSelectedAction = createAction(
  '[Repository Page] Is Page Selected',
  props<{ isPageSelected: boolean}>()
);

export const allPages = createAction(
  '[Repository Page] Is Page Selected'
);


