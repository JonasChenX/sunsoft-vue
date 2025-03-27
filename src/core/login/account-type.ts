export interface AccountType {
    id: string;
    userName: string;
    authoritiesList: string[];
    email: string;
    groupList: string[];
}

export const accountTypeTest: AccountType = {
    id: 'SS-2024032501',
    userName: 'test',
    authoritiesList: ['SS101','SS102','SS905','SS001'],
    email: 't@gmail.com',
    groupList: ['adminGroup','testGroup']
}