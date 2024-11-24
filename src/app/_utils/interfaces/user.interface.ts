export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  birthdate: Date;
  address: string;
  educationLevel: number;
  securityQuestion: string;
  securityAnswer: string;
  isAdmin: number;
}
