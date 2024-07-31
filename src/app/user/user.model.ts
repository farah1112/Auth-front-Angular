export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // password can be optional when fetching users
    enabled: boolean;
    roles: string[];
  }
  