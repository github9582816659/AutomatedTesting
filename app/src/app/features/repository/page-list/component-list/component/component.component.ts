import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Components, RefType} from "../../../model/component.model";
import * as fromRepository from "../../../state/repository.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../app.state";
import {
  saveComponentAction,
  updateComponentAction
} from "../../../state/repository.actions";

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {

  hideComponentForm: boolean = false; // MAKE IT TRUE AFTER CREATING AND TESTING FORM
  componentForm = this.fb.group({
    componentId: [''],
    componentMappingId: [''],
    projectId: [''],
    releaseId: [''],
    pageId: [''],
    pageName: ['', Validators.required],
    componentName: [''],
    componentDescription: [''],
    componentValueType: [''],
    isIntractable: [false],
    referenceType: [''],
    referenceValue: [''],
    tags: [],
    componentValueProperty: this.fb.group({
      componentValue: ['']
    })
  });

  isComponentSelected$: Observable<boolean> = this.store.select(fromRepository.selectIsComponentSelected);
  selectedComponent$: Observable<Components | null> | undefined;
  editMode: boolean = false;
  refTypes: RefType[] = [
    {value: 'JSPATH', viewValue: 'JS-Path'},
    {value: 'XPATH', viewValue: 'X-Path'},
    {value: 'CODE SNIPPET', viewValue: 'CODE-SNIPPET'},
  ];
  valueTypes: RefType[] = [
    {value: 'NONE', viewValue: 'None'},
    {value: 'FIXED', viewValue: 'Fixed'},
    {value: 'SENSITIVE', viewValue: 'Sensitive'},
  ];

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.selectedComponent$ = this.store.select<Components | null>(fromRepository.selectSelectedComponent)
      if (this.selectedComponent$) {
        this.selectedComponent$.subscribe((component:Components|null) => {
          if (component) {
            this.componentForm.setValue({
              componentId: component.componentId || '',
              componentMappingId: component.componentMappingId || '',
              projectId: component.projectId || '',
              releaseId: component.releaseId || '',
              pageId: component.pageId || '',
              pageName: component.pageName || '',
              componentName: component.componentName || '',
              componentDescription: component.componentDescription || '',
              componentValueType: component.componentValueType || '',
              isIntractable: component.isIntractable || false,
              referenceType: component.referenceType || '',
              referenceValue: component.referenceValue || '',
              tags: component.tags || [],
              componentValueProperty: {
                componentValue: component.componentValueProperty?.componentValue || '',
              }
            });

            this.componentForm.disable();
          }
        })
      }

  }

  editComponentClickHandler() {
    this.editMode = true;
    this.componentForm.enable();
  }

  deleteComponentHandler() {

  }

  componentSubmitHandler() {

    const component: Components = {
      componentId: this.componentForm.get('componentId')?.value ? this.componentForm.get('componentId')?.value : '',
      componentMappingId: this.componentForm.get('componentMappingId')?.value ? this.componentForm.get('componentMappingId')?.value : '',
      pageId: this.componentForm.get('pageId')?.value ? this.componentForm.get('pageId')?.value : '',
      projectId: this.componentForm.get('projectId')?.value ? this.componentForm.get('projectId')?.value : "6166a01c77d7795b83b0b680",
      releaseId: this.componentForm.get('releaseId')?.value ? this.componentForm.get('releaseId')?.value : "6166a01c77d7795b83b0b67e",
      pageName: this.componentForm.get('pageName')?.value,
      componentName: this.componentForm.get('componentName')?.value,
      componentDescription: this.componentForm.get('componentDescription')?.value,
      isIntractable: this.componentForm.get('isIntractable')?.value,
      referenceType: this.componentForm.get('referenceType')?.value,
      referenceValue: this.componentForm.get('referenceValue')?.value,
      tags: this.componentForm.get('tags')?.value,
      componentValueProperty: {
        componentValue: this.componentForm.get('componentValueProperty.componentValue')?.value || '',
      }

    }

    if (this.editMode) {
      this.store.dispatch(updateComponentAction({componentId: component.componentId, component: component}));
      this.editMode = false;
      this.componentForm.disable();
    } else {
      this.store.dispatch(saveComponentAction({component: component}));
      this.componentForm.reset();
      this.hideComponentForm = true;
    }


  }

  onValueTypeChange() {

  }

  getComponentValueType(valueType: any) {

  }
}
