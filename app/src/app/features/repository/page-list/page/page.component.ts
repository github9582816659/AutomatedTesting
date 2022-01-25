import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Page, RefType} from "../model/page.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Store} from "@ngrx/store";
import * as fromRepository from "../../state/repository.selectors";
import {AppState} from "../../../../app.state";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnDestroy {

  selectedPageSubscription!: Subscription;
  hidePageForm: boolean = true;
  pageForm = this.fb.group({
    _id: [''],
    pageMappingId: [''],
    projectId: [''],
    releaseId: [''],
    pageName: ['', Validators.required],
    pageDescription: [''],
    pageType: ['', Validators.required],
    isFrame: [false],
    referenceType: [''],
    referenceValue: [''],
    tags: [],
  });
  selectedPage$: Observable<Page | undefined> | undefined;
  isPageSelected$: Observable<boolean> | undefined;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  refTypes: RefType[] = [
    {value: 'XPATH', viewValue: 'X-Path'},
    {value: 'JSPATH', viewValue: 'JS-Path'},
  ];
  editMode: boolean = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isPageSelected$ = this.store.select<boolean>(fromRepository.isPageSelectedSelector);
    if ( this.isPageSelected$) {
      this.isPageSelected$.subscribe((isPageSelected: boolean) => {
        if (isPageSelected) {
          this.selectedPage$ = this.store.select<Page | undefined>(fromRepository.selectedPageSelector);
          if (this.selectedPage$) {
            this.selectedPage$.subscribe((page: Page | undefined) => {
              // Set Value to Form
              if (page) {
                this.pageForm.setValue({
                  _id: page._id,
                  pageMappingId: page.pageMappingId,
                  projectId: page.projectId,
                  releaseId: page.releaseId,
                  pageName: page.pageName,
                  pageDescription: page.pageDescription,
                  pageType: page.pageType,
                  isFrame: page.isFrame,
                  referenceType: page.referenceType,
                  referenceValue: page.referenceValue,
                  tags: page.tags
                });

                // Update Tags Array
                this.tags = page.tags;

                // Show Form
                this.hidePageForm = false;

                // Disable Form
                this.pageForm.disable();
              }

            });
          }
        } else {
          this.hidePageForm = true;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.selectedPageSubscription) {
      this.selectedPageSubscription.unsubscribe()
    }
  }

  pageSubmitHandler() {
    console.log(this.pageForm.value);

    if (this.editMode) {
      // Update
    } else {
      // Save
    }

    this.editMode = false;
    this.pageForm.disable();

  }

  addTag(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    // Add our Tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  editClickHandler() {
    this.pageForm.enable();
    this.editMode = true;
  }
}
