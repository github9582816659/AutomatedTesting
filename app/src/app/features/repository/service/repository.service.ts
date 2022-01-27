import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Page} from "../model/page.model";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  loadAllPages() {
    return this.http.get<Page[]>('http://localhost:8081/api/pages');
  }

  savePage(page: Page) {
    return this.http.post<Page>('http://localhost:8081/api/pages', page);
  }

  updatePage(pageId: string, page: Page) {
    return this.http.put<Page>(`http://localhost:8081/api/pages/${pageId}`, page);
  }

  deletePage(pageId: string) {
    return this.http.delete(`http://localhost:8081/api/pages/${pageId}`);
  }

}
