import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "./features/shared/shared.module";
import {StoreModule} from "@ngrx/store";
import * as fromRepository from "./features/repository/state/repository.reducer";
import { EffectsModule } from '@ngrx/effects';
import {RepositoryEffects} from "./features/repository/state/repository.effects";
import {HttpClientModule} from "@angular/common/http";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ repository: fromRepository.repositoryReducer }),
    SharedModule,
    EffectsModule.forRoot([RepositoryEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
