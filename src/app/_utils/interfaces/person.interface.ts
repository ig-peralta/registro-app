import { EducationLevel } from '../enums/education-level.enum';

export interface Person {
  name: string;
  surname: string;
  educationLevel: EducationLevel;
  birthdate: Date;
}
