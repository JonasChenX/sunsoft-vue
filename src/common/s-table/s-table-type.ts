export interface STableItemType {
    id: string | number;
    selectable?: boolean; //是否能被勾選 (預設為true)
}

export interface STableHeaderType {
    key: string;
    title: string;
    sortable: boolean;
    children?: any[];
    align?: string;
    value?: string | ((item: any) => string); // 讓 value 支援函式
}