
export enum RoleType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  MANAGER = 'Manager',
  ADMIN = 'ADMIN',
  USER = 'USER',
  FEE='FEE'

}


export interface User {
  id: number;
  username: string;
  email: string;
  roles: RoleType[];
}
