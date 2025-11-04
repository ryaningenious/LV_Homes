import { getData } from "./agentService";
import { transformObject } from "./dataService";
import { type RootResult } from "../models/result";

export interface Post {
  title?: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  category?: string;
  tags?: string;
  routePath?: string;
}

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await getData<RootResult>(
      "/contentitems/posts?orderBy=CreationTime%20asc&pageNumber=1&pageSize=3"
    );

    if (!response.result) return Promise.resolve([]);

    const array = response.result.items.map((item) => {
      return {
        ...transformObject(item.publishedContent),
        routePath: item.routePath,
      };
    });

    return Promise.resolve((array as Post[]) ?? []);
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
