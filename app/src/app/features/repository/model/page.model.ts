export interface Page {
  pageId: string;
  pageMappingId: string;
  projectId: string;
  releaseId: string;
  pageName: string;
  pageDescription?: string;
  pageType?: string;
  isFrame?: boolean;
  referenceType?: string;
  referenceValue?: string;
  tags?: string[]
}


export interface RefType {
  value: string;
  viewValue: string;
}
