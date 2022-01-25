import { createAction, props } from '@ngrx/store';
import {Page} from "../page-list/model/page.model";

export const selectPage = createAction(
  '[Repository Page] Select Page',
  props<{ page: Page | undefined}>()
);
