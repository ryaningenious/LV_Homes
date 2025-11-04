/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getData } from "./apiService";
import { RootMenu } from "./models";


export interface Menu {
  label: string;
  url: string;
  isDisabled: boolean;
  openInNewTab: boolean;
  cssClassName: string;
  ordinal: number;
  parentNavigationMenuItemId: any;
  navigationMenuId: string;
  creatorUser: any;
  lastModifierUser: any;
  creationTime: string;
  creatorUserId: any;
  lastModifierUserId: any;
  lastModificationTime: any;
  id: string;
}

export const getMenus = async (): Promise<Menu[]> => {
  try {
    const response = await getData<RootMenu>("/menus/mainmenu/menu-items");

    if (!response.result) return Promise.resolve([]);

    const array = response.result.items as Menu[];

    return Promise.resolve((array as Menu[]) ?? []);
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
