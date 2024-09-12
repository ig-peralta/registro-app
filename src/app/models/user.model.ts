import { Person } from "./person.model";

export class User extends Person {
  id: number = 0;
  username: string = '';
  email: string = '';
  password: string = '';
  securityQuestion: string = '';
  securityAnswer: string = '';
}
