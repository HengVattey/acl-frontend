
export interface Role{
roldId:number;
roleName:string;
roleDescription:string;
permissions:Permission[];
}

export interface Permission{
perId:number;
perName:string;
perDescription:string;
}