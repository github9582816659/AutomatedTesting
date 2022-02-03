import {ComponentValueProperty} from "./component-value-type.model";

export interface Components {
  componentId: string;
  componentMappingId: string;
  projectId: string;
  releaseId: string;
  pageId: string;
  pageName: string;
  componentName: string;
  componentDescription?: string;
  componentValueType?: string;
  isIntractable?: boolean;
  referenceType?: string;
  referenceValue?: string;
  tags?: string[];
  componentValueProperty?: ComponentValueProperty;
}


export interface RefType {
  value: string;
  viewValue: string;
}

export interface ComponentDelete {
  componentId: string
}
