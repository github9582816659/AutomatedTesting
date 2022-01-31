import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Components} from "../../../model/component.model";

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

  selectedComponent$: Observable<Components | null> | undefined;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  editComponentClickHandler() {

  }

  deleteComponentHandler() {

  }
}
