import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Page, RefType} from "../../model/page.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Store} from "@ngrx/store";
import * as fromRepository from "../../state/repository.selectors";
import {AppState} from "../../../../app.state";
import {isAddPageClickedAction} from "../../state/repository.actions";

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
    pageType: [''],
    isFrame: [false],
    referenceType: [''],
    referenceValue: [''],
    tags: [],
  });
  selectedPage$: Observable<Page | undefined> | undefined;
  isPageSelected$: Observable<boolean> | undefined;
  isAddPageClicked$: Observable<boolean> | undefined;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  refTypes: RefType[] = [
    {value: 'XPATH', viewValue: 'X-Path'},
    {value: 'JSPATH', viewValue: 'JS-Path'},
  ];
  editMode: boolean = false;
  addMode: boolean = false;
  isPageSelected: boolean = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAddPageClicked$ = this.store.select<boolean>(fromRepository.isAddPageClicked);
    if (this.isAddPageClicked$) {
      this.isAddPageClicked$.subscribe((isAddPageClicked: boolean) => {
        if (isAddPageClicked) {
          this.addMode = isAddPageClicked;
          this.pageForm.reset();
          this.hidePageForm = false;
        }
      })
    }

    this.isPageSelected$ = this.store.select<boolean>(fromRepository.isPageSelectedSelector);
    if ( this.isPageSelected$) {
      this.isPageSelected$.subscribe((isPageSelected: boolean) => {
        if (isPageSelected) {
          this.isPageSelected = isPageSelected;
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

                console.log(this.pageForm.value)

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
          this.pageForm.reset();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.selectedPageSubscription) {
      this.selectedPageSubscription.unsubscribe()
    }
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

  editPageClickHandler() {
    this.pageForm.enable();
    this.editMode = true;
  }

  pageSubmitHandler() {
    console.log(this.pageForm.value);

    if (this.editMode) {
      // Update
      console.log('Edit Mode');
      this.editMode = false;
      this.pageForm.disable();
    } else {
      // Save
      console.log('Create Mode');
      this.pageForm.reset();
      this.store.dispatch(isAddPageClickedAction({isAddPageClicked: false}));
      this.hidePageForm = true;
    }



  }

}
