/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeatureContent, GltfContent, PartnerContent, ProjectContent, RootResult } from "../models/result";
import { getData } from "./agentService";

export interface Feature {
  title: string;
  description?: string;
  image?: string;
  is_active?: boolean;
}

function transformObject<T extends ProjectContent | GltfContent | FeatureContent | PartnerContent>(data: T): Record<string, any> {
  const transformed: Record<string, any> = {};

  for (const key in data) {
    if (data[key] && typeof data[key] === "object" && "value" in data[key]) {
      transformed[key] = data[key].value;
    }
  }

  return transformed;
}

export const getFeatures = async (): Promise<Feature[]> => {
  try {
    const response = await getData<RootResult>("/contentitems/features?filter=is_active%20eq%20%27true%27");

    if (!response.result) return Promise.resolve([]);

    const array = response.result.items.map((item) => {
      return transformObject(item.publishedContent);
    });

    // console.log(array);

    return Promise.resolve((array as Feature[]) ?? []);
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
