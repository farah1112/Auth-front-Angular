export interface Role {
  id?: number;
  name: string;
}

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  enabled: boolean;
  roles: Role[];  
}
