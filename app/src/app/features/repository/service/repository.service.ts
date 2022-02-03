import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Page} from "../model/page.model";
import {Components} from "../model/component.model";

interface PageDelete {
  pageId: string
}

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) {
  }

  // ############################################# PAGES #############################################
  // #################################################################################################


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
    return this.http.delete<PageDelete>(`http://localhost:8081/api/pages/${pageId}`);
  }


  // ########################################## COMPONENTS ###########################################
  // #################################################################################################


  loadAllComponents(pageId: string) {
    return this.http.get<Components[]>(`http://localhost:8081/api/components/pages/${pageId}`);
  }

  saveComponent(component: Components) {
    return this.http.post<Components>('http://localhost:8081/api/components', component);
  }

  updateComponent(componentId: string, component: Components) {
    return this.http.put<Components>(`http://localhost:8081/api/components/${componentId}`, component);
  }
}
