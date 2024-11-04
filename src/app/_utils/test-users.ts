import { User } from "./interfaces/user.interface";

export const testUsers: User[] = [
  {
    name: 'John',
    lastname: 'Doe',
    birthdate: new Date(),
    educationLevel: 4,
    username: 'john',
    email: 'john@gmail.com',
    password: 'john123',
    securityQuestion: '¿Cuál es el nombre de tu mascota?',
    securityAnswer: 'rex',
  },
  {
    name: 'Jane',
    lastname: 'Doe',
    birthdate: new Date(),
    educationLevel: 5,
    username: 'jane',
    email: 'jane@gmail.com',
    password: 'jane123',
    securityQuestion: '¿En que ciudad naciste?',
    securityAnswer: 'lima',
  },
  {
    name: 'Foo',
    lastname: 'Bar',
    birthdate: new Date(),
    educationLevel: 6,
    username: 'foo',
    email: 'foo@gmail.com',
    password: 'foo123',
    securityQuestion: '¿Cuál es tu comida favorita?',
    securityAnswer: 'ceviche',
  },
  {
    name: 'Bar',
    lastname: 'Foo',
    birthdate: new Date(),
    educationLevel: 4,
    username: 'bar',
    email: 'bar@gmail.com',
    password: 'bar123',
    securityQuestion: '¿Cuál es tu color favorito?',
    securityAnswer: 'amarillo'
  },
]