import menus from '@/core/menu/menu.json';
import { MenuItem } from "@/core/menu/menu";
import { useAccountStore } from '@/store/account-store';

export const getMenu = (accountStore : ReturnType<typeof useAccountStore>) => {
    const authoritiesList = accountStore.getAccount?.authoritiesList || [];
    return filterMenuData(menus, authoritiesList);
};

const filterMenuData = (menuData: MenuItem[], authoritiesList: string[]): MenuItem[] => {
    const result: MenuItem[] = [];
    menuData.forEach(item => {
        if (item.meta.directory && item.children) {
            const filteredChildren = item.children.filter(childrenItem =>
                authoritiesList.some(auth => auth.startsWith(childrenItem.meta.functionId))
            );
            if (filteredChildren.length > 0) {
                result.push({
                    ...item,
                    children: filteredChildren
                });
            }
        } else if (!item.meta.directory && authoritiesList.some((auth: string) => auth.startsWith(item.meta?.functionId as string))) {
            result.push({ ...item });
        }
    });
    return result;
};
