import { User } from "./interfaces/user.interface";

export const testUsers: User[] = [
  {
    name: 'FooAdmin',
    lastname: 'BarAdmin',
    birthdate: new Date(),
    educationLevel: 4,
    username: 'admin',
    email: 'foobaradmin@gmail.com',
    address: 'Foo Bar, 45, Admin, 28013, FooBar',
    password: 'admin123',
    securityQuestion: '¿Cuál es tu Foo?',
    securityAnswer: 'bar',
    isAdmin: 1
  },
  {
    name: 'John',
    lastname: 'Doe',
    birthdate: new Date(),
    educationLevel: 4,
    username: 'john',
    email: 'john@gmail.com',
    address: 'Calle Mayor, 45, Madrid, 28013, España',
    password: 'john123',
    securityQuestion: '¿Cuál es el nombre de tu mascota?',
    securityAnswer: 'rex',
    isAdmin: 0
  },
  {
    name: 'Jane',
    lastname: 'Doe',
    birthdate: new Date(),
    educationLevel: 5,
    username: 'jane',
    email: 'jane@gmail.com',
    address: 'Avenida Paulista, 1578, São Paulo, SP, 01310-200, Brasil',
    password: 'jane123',
    securityQuestion: '¿En que ciudad naciste?',
    securityAnswer: 'lima',
    isAdmin: 0
  },
  {
    name: 'Foo',
    lastname: 'Bar',
    birthdate: new Date(),
    educationLevel: 6,
    username: 'foo',
    email: 'foo@gmail.com',
    address: 'Paseo de la Reforma, 500, Ciudad de México, 06600, México',
    password: 'foo123',
    securityQuestion: '¿Cuál es tu comida favorita?',
    securityAnswer: 'ceviche',
    isAdmin: 0
  },
  {
    name: 'Bar',
    lastname: 'Foo',
    birthdate: new Date(),
    educationLevel: 4,
    username: 'bar',
    email: 'bar@gmail.com',
    address: 'Rue de Rivoli, 110, París, 75001, Francia',
    password: 'bar123',
    securityQuestion: '¿Cuál es tu color favorito?',
    securityAnswer: 'amarillo',
    isAdmin: 0
  },
]
