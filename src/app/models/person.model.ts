import { EducationLevel } from "../_utils/enums/education-level.enum"

export class Person {
  name: string = '';
  lastname: string = '';
  educationLevel: EducationLevel = EducationLevel.BasicaCompleta;
  birthdate: Date = new Date();
}
