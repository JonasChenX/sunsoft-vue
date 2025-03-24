export interface STableItemType {
    id: string | number;
    selectable?: boolean; //是否能被勾選 (預設為true)
}

export interface STableHeaderType {
    key: string;
    title: string;
    sortable: boolean;
    children?: readonly {
        title?: string | undefined;
        value?: string | ((item: any) => string);
        align?: ("start" | "end" | "center") | undefined;
        sortable?: boolean | undefined;
    }[],
    align?: ("start" | "end" | "center") | undefined;
    value?: string | ((item: any) => string); // 讓 value 支援函式
}