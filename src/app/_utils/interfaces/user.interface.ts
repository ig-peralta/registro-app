import { Person } from "./person.interface";

export interface User extends Person {
  id: number;
  username: string;
  email: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
}
