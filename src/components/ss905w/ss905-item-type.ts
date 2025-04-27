import { STableItemType } from "@/common/s-table/s-table-type";

export interface Ss905TableItemType extends STableItemType {
    id: string,
    indexId: number,
    fileName: string,
    fileSize: string,
    lastModifiedTime: string
}

export const ss905TableItemsTest: Ss905TableItemType[] = [
    {
        id: "1",
        indexId: 1,
        fileName: "報表_2025年Q1.xlsx",
        fileSize: "1.2MB",
        lastModifiedTime: "2025-04-25 10:30:00",
    },
    {
        id: "2",
        indexId: 2,
        fileName: "員工名單.csv",
        fileSize: "500KB",
        lastModifiedTime: "2025-04-26 09:00:15",
    },
    {
        id: "3",
        indexId: 3,
        fileName: "系統設定檔.json",
        fileSize: "200KB",
        lastModifiedTime: "2025-04-27 12:45:00",
    }
];