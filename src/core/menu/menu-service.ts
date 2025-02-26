import menus from '@/core/menu/menu.json';
import { MenuItem } from "@/core/menu/menu";

export const getMenu = (): MenuItem[] => {
    return menus;
};
