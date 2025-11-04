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
  publishedContent:
    | GltfContent
    | ProjectContent
    | FeatureContent
    | PartnerContent;
  draftContent:
    | GltfDraftContent
    | ProjectDraftContent
    | FeatureContent
    | PartnerContent;
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
  short_description: DataType;
  description: DataType;
  classification: DataType;
  main_image: DataType;
  zip_gallery: DataType;
  color: DataType;
  latitude: DataType;
  longitude: DataType;
  is_featured: DataType;
  content: DataType;
  bedrooms: DataType;
  total_area_size: DataType;
  bathrooms: DataType;
  payment_plan: DataType;
  structure: DataType;
  starting_price_aed: DataType;
  handover: DataType;
  total_units: DataType;
  residential_property_amenities: DataType;
  exterior_community_amenities: DataType;
  commercial_property_amenities: DataType;
  luxury_highend_amenities: DataType;
}

export interface ProjectDraftContent {
  title: DataType;
  short_description: DataType;
  description: DataType;
  classification: DataType;
  main_image: DataType;
  zip_gallery: DataType;
  color: DataType;
  latitude: DataType;
  longitude: DataType;
  is_featured: DataType;
  content: DataType;
  bedrooms: DataType;
  total_area_size: DataType;
  bathrooms: DataType;
  payment_plan: DataType;
  structure: DataType;
  starting_price_aed: DataType;
  handover: DataType;
  total_units: DataType;
  residential_property_amenities: DataType;
  exterior_community_amenities: DataType;
  commercial_property_amenities: DataType;
  luxury_highend_amenities: DataType;
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

export interface RecordRoot {
  result: RecordResult;
  error: string;
  success: boolean;
}

export interface RecordResult {
  creatorUser: any;
  lastModifierUser: any;
  creationTime: string;
  lastModificationTime: string;
  isPublished: boolean;
  isDraft: boolean;
  contentTypeId: string;
  routePath: string;
  primaryField: string;
  publishedContent: ProjectContent;
  draftContent: ProjectContent;
  id: string;
}
