import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Page, RefType} from "../../model/page.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Store} from "@ngrx/store";
import * as fromRepository from "../../state/repository.selectors";
import {AppState} from "../../../../app.state";
import {
  deletePageAction, savePageAction, updatePageAction
} from "../../state/repository.actions";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, OnDestroy {

  selectedPageSubscription!: Subscription;
  hidePageForm: boolean = true;
  pageForm = this.fb.group({
    pageId: [''],
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
  selectedPage$: Observable<Page | null> | undefined;
  isPageSelected$: Observable<boolean> | undefined;
  isComponentSelected$: Observable<boolean> = this.store.select(fromRepository.selectIsComponentSelected);
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

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit() {

    this.store.select<boolean>(fromRepository.selectIsAddPageClicked).subscribe((isAddPageClicked: boolean) => {
      if (isAddPageClicked) {
        this.addMode = isAddPageClicked;
        this.isPageSelected = false;
        this.pageForm.reset();
        this.pageForm.enable();
        this.tags = [];
        this.hidePageForm = false;
      }
    });

    this.isPageSelected$ = this.store.select<boolean>(fromRepository.selectIsPageSelected);
    if ( this.isPageSelected$) {
      this.isPageSelected$.subscribe((isPageSelected: boolean) => {
        if (isPageSelected) {
          // PAGE OPEN
          this.isPageSelected = isPageSelected;
          this.selectedPage$ = this.store.select<Page | null>(fromRepository.selectSelectedPage);
          if (this.selectedPage$) {
            this.selectedPage$.subscribe((page: Page | null) => {
              // Set Value to Form
              if (page) {
                this.pageForm.setValue({
                  pageId: page?.pageId,
                  pageMappingId: page?.pageMappingId,
                  projectId: page?.projectId,
                  releaseId: page?.releaseId,
                  pageName: page?.pageName,
                  pageDescription: page?.pageDescription || '',
                  pageType: page?.pageType,
                  isFrame: page?.isFrame || false,
                  referenceType: page?.referenceType || '',
                  referenceValue: page?.referenceValue || '',
                  tags: page?.tags
                });

                // Update Tags Array
                this.tags = [];

                if (page.tags) {
                  this.tags.push(...page.tags) ;
                }

                // Show Form
                this.hidePageForm = false;

                // Disable Form
                this.pageForm.disable();
              }

            });
          }
        } else {
          // PAGE CLOSE
          this.isPageSelected = false;
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
      this.pageForm.get('tags')?.setValue(this.tags);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.pageForm.get('tags')?.setValue(this.tags);
    }
  }

  editPageClickHandler() {
    this.pageForm.enable();
    this.editMode = true;
  }

   pageSubmitHandler() {

    const page: Page = {
      pageId: this.pageForm.get('pageId')?.value ? this.pageForm.get('pageId')?.value : '',
      pageMappingId: this.pageForm.get('pageMappingId')?.value ? this.pageForm.get('pageMappingId')?.value : '',
      projectId: this.pageForm.get('projectId')?.value ? this.pageForm.get('projectId')?.value : "6166a01c77d7795b83b0b680",
      releaseId: this.pageForm.get('releaseId')?.value ? this.pageForm.get('releaseId')?.value : "6166a01c77d7795b83b0b67e",
      pageName: this.pageForm.get('pageName')?.value,
      pageDescription: this.pageForm.get('pageDescription')?.value,
      isFrame: this.pageForm.get('isFrame')?.value,
      pageType: this.pageForm.get('isFrame')?.value ? 'PAGE' : 'FRAME',
      referenceType: this.pageForm.get('referenceType')?.value,
      referenceValue: this.pageForm.get('referenceValue')?.value,
      tags: this.pageForm.get('tags')?.value,

    }

    if (this.editMode) {
      console.log('PAGE_EDIT')
      this.store.dispatch(updatePageAction({pageId: page.pageId, page: page}));
      this.editMode = false;
      this.pageForm.disable();
    } else {
      console.log('PAGE_SAVE')
      this.store.dispatch(savePageAction({page: page}));
      this.pageForm.reset();
      this.hidePageForm = true;
    }

   }

   deletePageHandler() {
    const pageId: string = this.pageForm.get('pageId')?.value;
    this.store.dispatch(deletePageAction({pageId: pageId}));
   }
}
