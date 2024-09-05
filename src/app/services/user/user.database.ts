import { User } from "src/app/_utils/interfaces/user.interface";
import { EducationLevel } from "../../_utils/enums/education-level.enum";


export const usersDb: User[] = [
  {
    id: 0,
    name: 'John',
    surname: 'Doe',
    birthdate: new Date(),
    educationLevel: EducationLevel.SuperiorIncompleta,
    username: 'john',
    email: 'john@gmail.com',
    password: 'john123',
    securityQuestion: '¿Cuál es el nombre de tu mascota?',
    securityAnswer: 'rex',
  },
  {
    id: 1,
    name: 'Jane',
    surname: 'Doe',
    birthdate: new Date(),
    educationLevel: EducationLevel.MediaCompleta,
    username: 'jane',
    email: 'jane@gmail.com',
    password: 'jane123',
    securityQuestion: '¿En que ciudad naciste?',
    securityAnswer: 'lima',
  },
  {
    id: 2,
    name: 'Foo',
    surname: 'Bar',
    birthdate: new Date(),
    educationLevel: EducationLevel.SuperiorIncompleta,
    username: 'foo',
    email: 'foo@gmail.com',
    password: 'foo123',
    securityQuestion: '¿Cuál es tu comida favorita?',
    securityAnswer: 'ceviche',
  },
  {
    id: 3,
    name: 'Bar',
    surname: 'Foo',
    birthdate: new Date(),
    educationLevel: EducationLevel.SuperiorCompleta,
    username: 'bar',
    email: 'bar@gmail.com',
    password: 'bar123',
    securityQuestion: '¿Cuál es tu color favorito?',
    securityAnswer: 'amarillo'
  },
]
