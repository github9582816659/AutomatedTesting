import {RouterModule, Routes} from "@angular/router";
import {RepositoryComponent} from "./repository.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: RepositoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule { }
