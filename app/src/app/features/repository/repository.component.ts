import {Component, OnInit} from '@angular/core';
import {async, Observable} from "rxjs";
import * as fromRepository from "./state/repository.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.state";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../shared/snackbar/snackbar.component";

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  componentError$: Observable<string | null> = this.store.select(fromRepository.selectComponentError);

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.componentError$.subscribe((error: any) => {
      if (error) {
        const snackBar = this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.error.status === 'NOT_FOUND' ? 'No Component Present' : '',
            preClose: () => {
              snackBar.dismiss()
            }
          }
        });
      }
    })
  }

}
