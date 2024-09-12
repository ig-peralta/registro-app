import { EducationLevel } from "../enums/education-level.enum";

export interface User {
  id: number;
  username: string;
  email: string;
  securityQuestion: string;
  name: string;
  surname: string;
  educationLevel: EducationLevel;
  birthdate: Date;
}

