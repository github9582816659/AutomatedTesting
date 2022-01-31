import {NgModule} from "@angular/core";
import { PageListComponent } from './page-list/page-list.component';
import { PageComponent } from './page-list/page/page.component';
import {RepositoryRoutingModule} from "./repository-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "../../material.module";
import { ComponentListComponent } from './page-list/component-list/component-list.component';
import {HttpClientModule} from "@angular/common/http";
import { ComponentComponent } from './page-list/component-list/component/component.component';
import {RepositoryComponent} from "./repository.component";

@NgModule({
  declarations: [
    RepositoryComponent,
    PageListComponent,
    ComponentListComponent,
    PageComponent,
    ComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    RepositoryRoutingModule
  ]
})
export class RepositoryModule {
}
