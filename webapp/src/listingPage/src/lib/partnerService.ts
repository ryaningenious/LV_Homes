import { getData } from "./apiService";
import { transformObject } from "./dataService";
import { RecordRoot, RootResult } from "./models";

export interface Partner {
  title: string;
  logo?: string;
}

export interface Project {
  title?: string;
  short_description?: string;
  description?: string;
  classification?: string;
  main_image?: string;
  zip_gallery?: string;
  color?: string;
  latitude?: number;
  longitude?: number;
  is_featured?: string;
  content?: string;
  bedrooms?: string;
  total_area_size?: number;
  bathrooms?: string;
  payment_plan?: string;
  structure?: string;
  starting_price_aed?: number;
  handover?: string;
  total_units?: string;
  residential_property_amenities?: string[];
  exterior_community_amenities?: string[];
  commercial_property_amenities?: string[];
  luxury_highend_amenities?: string[];
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await getData<RootResult>("/contentitems/projects");

    if (!response.result) return Promise.resolve([]);

    const array = response.result.items.map((item) => {
      return transformObject(item.publishedContent);
    });

    return Promise.resolve((array as Project[]) ?? []);
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const getProjectByName = async (id: string): Promise<Project | null> => {
  try {
    const response = await getData<RecordRoot>(`/contentitems/projects/${id}`);

    const result = transformObject(response.result.publishedContent);

    return Promise.resolve(result as Project);
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
