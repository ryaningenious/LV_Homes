/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FeatureContent,
  GltfContent,
  PartnerContent,
  PostContent,
  ProjectContent,
  RootResult,
} from "../models/result";
import { getData } from "./agentService";

export interface Location {
  longitude: number;
  latitude: number;
  title: string;
  description?: string;
  color?: string;
  main_image?: string;
  routePath?: string;
}

function transformObject<
  T extends
    | ProjectContent
    | GltfContent
    | FeatureContent
    | PartnerContent
    | PostContent
>(data: T): Record<string, any> {
  const transformed: Record<string, any> = {};

  for (const key in data) {
    if (data[key] && typeof data[key] === "object" && "value" in data[key]) {
      transformed[key] = data[key].value;
    }
  }

  return transformed;
}

export const getLocations = async (): Promise<Location[]> => {
  try {
    const response = await getData<RootResult>(
      "/contentitems/projects?filter=classification%20eq%20%27map_dubai%27"
    );

    if (!response.result) return Promise.resolve([]);

    const array = response.result.items.map((item) => {
      return {
        ...transformObject(item.publishedContent),
        routePath: item.routePath,
      };
    });

    // console.log(array);

    return Promise.resolve((array as Location[]) ?? []);
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
