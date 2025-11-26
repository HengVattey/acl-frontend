
export interface Role{
roleId:number;
roleName:string;
}

export interface Permission{
perId:number;
perName:string;
perDescription:string;
}

export interface UpdateUser {
  username?: string;
  password?: string;
  phoneNumber?: string;
}


