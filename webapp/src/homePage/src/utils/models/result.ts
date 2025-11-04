/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RootResult {
  result?: Result;
  error: string;
  success: boolean;
}

export interface Result {
  items: ContentItem[];
  totalCount: number;
}

export interface RootMenu {
  result?: MenuResult;
  error: string;
  success: boolean;
}

export interface MenuResult {
  items: any[];
  totalCount: number;
}

export interface ContentItem {
  creatorUser: CreatorUser;
  lastModifierUser: any;
  creationTime: string;
  lastModificationTime: any;
  isPublished: boolean;
  isDraft: boolean;
  contentTypeId: string;
  routePath: string;
  primaryField: string;
  publishedContent: GltfContent | ProjectContent | FeatureContent | PartnerContent;
  draftContent: GltfDraftContent | ProjectDraftContent | FeatureContent | PartnerContent;
  id: string;
}

export interface FeatureContent {
  title: DataType;
  description: DataType;
  is_active: DataType;
  image: DataType;
}

export interface PartnerContent {
  title: DataType;
  logo: DataType;
}

export interface ProjectContent {
  title: DataType;
  content: DataType;
  longitude: DataType;
  latitude: DataType;
  description: DataType;
  classification: DataType;
}

export interface ProjectDraftContent {
  title: DataType;
  content: DataType;
  longitude: DataType;
  latitude: DataType;
  description: DataType;
  classification: DataType;
}

export interface GltfContent {
  title: DataType;
  threejs_file: DataType;
  classification: DataType;
}

export interface GltfDraftContent {
  title: DataType;
  threejs_file: DataType;
  classification: DataType;
}

export interface CreatorUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
  fullName: string;
  id: string;
}

export interface DataType {
  value: any;
  text: string;
  hasValue: boolean;
}
