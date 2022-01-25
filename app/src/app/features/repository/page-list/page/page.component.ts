import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageService} from "../service/page.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Page} from "../model/page.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Store} from "@ngrx/store";
import * as repository from "../../state/repository.selectors";

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
  selectedPage$: Observable<Page> | undefined;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];


  constructor(private pageService: PageService, private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {

    // this.selectedPageSubscription = this.pageService.selectedPageChanged.subscribe((page: Page) => {
    //
    //   // Set Value to Form
    //   this.pageForm.setValue({
    //     _id: page._id,
    //     pageMappingId: page.pageMappingId,
    //     projectId: page.projectId,
    //     releaseId: page.releaseId,
    //     pageName: page.pageName,
    //     pageDescription: page.pageDescription,
    //     pageType: page.pageType,
    //     isFrame: page.isFrame,
    //     referenceType: page.referenceType,
    //     referenceValue: page.referenceValue,
    //     tags: page.tags
    //   });
    //
    //   // Update Tags Array
    //   this.tags = page.tags;
    //
    //   // Show Form
    //   this.hidePageForm = false;
    // });


    // @ts-ignore
    this.selectedPage$ = this.store.select<Page>(repository.selectedPage());

    if (this.selectedPage$) {
      this.selectedPage$.subscribe((page: Page) => {
        // Set Value to Form
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
}
