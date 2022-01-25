import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Page} from "../model/page.model";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  selectedPageChanged = new Subject<Page>();

  constructor() { }

  selectedPage(page: Page) {
    if (page) {
      this.selectedPageChanged.next(page);
    }
  }

}
