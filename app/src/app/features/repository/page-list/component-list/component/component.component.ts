import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Components, RefType} from "../../../model/component.model";
import * as fromRepository from "../../../state/repository.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../app.state";
import {selectSelectedComponent} from "../../../state/repository.selectors";

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
            })
          }
        })
      }

    console.log(this.componentForm.value)

  }

  editComponentClickHandler() {

  }

  deleteComponentHandler() {

  }

  componentSubmitHandler() {
    console.log(this.componentForm.value)
  }

  onValueTypeChange() {

  }

  getComponentValueType(valueType: any) {

  }
}
