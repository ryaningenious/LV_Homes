import { GltfContent, RootResult } from "../models/result";
import { getData } from "./agentService";

export interface GLBModel {
  name: string;
  url: string;
}

export const getGlbFiles = async (): Promise<GLBModel[]> => {
  try {
    const response = await getData<RootResult>(
      "/contentitems/gltf?filter=classification%20eq%20%27map_dubai%27"
    );

    if (!response.result) return Promise.resolve([]);

    const array = response.result.items.map((item) => {
      const gltf = item.publishedContent as GltfContent;
      return {
        name: gltf.title.value,
        url: `${import.meta.env.VITE_STATIC_FILE}/${gltf.threejs_file.value}`,
      };
    });

    // if (import.meta.env.VITE_ENV === "development") {
    //   array.splice(0, array.length);
    //   const devArray = [
    //     {
    //       name: "surface.glb",
    //       url: "http://localhost:5000/files/glb/dubai/surface.glb",
    //     },
    //     {
    //       name: "building_1.glb",
    //       url: "http://localhost:5000/files/glb/dubai/building_1.glb",
    //     },
    //     {
    //       name: "building_2.glb",
    //       url: "http://localhost:5000/files/glb/dubai/building_2.glb",
    //     },
    //     {
    //       name: "building_3.glb",
    //       url: "http://localhost:5000/files/glb/dubai/building_3.glb",
    //     },
    //     {
    //       name: "building_4.glb",
    //       url: "http://localhost:5000/files/glb/dubai/building_4.glb",
    //     },
    //     {
    //       name: "building_5.glb",
    //       url: "http://localhost:5000/files/glb/dubai/building_5.glb",
    //     },
    //     {
    //       name: "building_6.glb",
    //       url: "http://localhost:5000/files/glb/dubai/building_6.glb",
    //     },
    //   ];

    //   array.push(...devArray);
    // }

    return Promise.resolve((array as GLBModel[]) ?? []);
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
