export interface MenuItem {
    id: number;
    meta: {
        directory: boolean;
        icon: string;
        label?: string;
        functionId?: string;
    };
    children?: childrenItem[];
    path?: string;
};

interface childrenItem {
    id: number;
    meta: {
        functionId: string;
        icon: string;
        label: string;
    };
    path: string;
}