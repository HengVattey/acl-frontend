export interface User {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    roles?: Role[];
}



export interface Role {
    id?: number;
    name?: string;
    description?: string;
    permissions?: Permission[];
   
}

export interface Permission {
    id?: number;
    name?: string;
    description?: string;
}
