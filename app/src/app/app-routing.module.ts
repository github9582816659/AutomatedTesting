import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/repository', pathMatch: 'full'},
  {path: 'repository', loadChildren: () => import('./features/repository/repository.module').then((m) => m.RepositoryModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
