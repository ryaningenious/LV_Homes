import type { RootResult } from "../models/result";
import { getData } from "./agentService";
import { transformObject } from "./dataService";

export interface Partner {
  title: string;
  logo?: string;
}

export const getPartners = async (): Promise<Partner[]> => {
  try {
    const response = await getData<RootResult>("/contentitems/partners");

    if (!response.result) return Promise.resolve([]);

    const array = response.result.items.map((item) => {
      return transformObject(item.publishedContent);
    });

    return Promise.resolve((array as Partner[]) ?? []);
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
