import { ss101TableItemsTest, Ss101TableItemType } from "@/components/ss101w/ss101-item-type";

//申請紀錄查詢(特休/請假/加班)
export const queryApplicationRecords = (request : Record<string, string>): Promise<{ data: Ss101TableItemType[] }> => {
    return new Promise((resolve, reject) => {
        console.log(request)
        setTimeout(() => {
            resolve({ data: ss101TableItemsTest });
            // reject("error");
        }, 2000);
    });
};
