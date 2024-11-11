import { Injectable, inject } from '@angular/core';
import { SqliteService } from '../database/sqlite.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { User } from 'src/app/_utils/interfaces/user.interface';
import { testUsers } from 'src/app/_utils/test-users';

@Injectable({providedIn: 'root'})
export class UsersService {
  private readonly sqlite = inject(SqliteService);

  userUpgrades = [
    {
      toVersion: 1,
      statements: [`
        CREATE TABLE IF NOT EXISTS USER (
          username TEXT PRIMARY KEY NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          name TEXT NOT NULL,
          lastname TEXT NOT NULL,
          address TEXT NOT NULL,
          birthdate TEXT NOT NULL,
          education_level INTEGER NOT NULL,
          security_question TEXT NOT NULL,
          security_answer TEXT NOT NULL
        );
      `]
    }
  ]
  dbName = 'registro-app-db';
  db!: SQLiteDBConnection;

  async initDb() {
    await this.sqlite.createDb({database: this.dbName, upgrade: this.userUpgrades});
    this.db = await this.sqlite.initConnection(this.dbName, false, 'no-encryption', 1, false);
    await this.createTestUsers();
  }

  async createTestUsers() {
    const users: User[] = testUsers;
    for (const user of users) {
      const parsedUser: any = {...user};
      parsedUser.birthdate = user.birthdate.toString();
      if (!(await this.findOne(parsedUser.username)))
        await this.create(parsedUser);
    }
  }

  async findAll(): Promise<User[]> {
    const rawUsers: any[] = (await this.db.query('SELECT * FROM USER;')).values as any[];
    const users: User[] = [];
    for (const user of rawUsers) {
      user.birthdate = new Date(user.birthdate);
      users.push(user as User);
    }
    return users;
  }

  async findOne(username: string): Promise<User | undefined> {
    const users: any[] = (await this.db.query('SELECT * FROM USER WHERE username=?;', [username])).values as any[];
    const user = users[0];
    user.birthdate = new Date(user.birthdate);
    return user as User;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const users: any[] = (await this.db.query('SELECT * FROM USER WHERE email=?;', [email])).values as any[];
    const user = users[0];
    user.birthdate = new Date(user.birthdate);
    return user as User;
  }

  async changePassword(username: string, newPassword: string): Promise<User | null> {
    await this.db.run('UPDATE USER SET password=? WHERE username=?;', [newPassword, username]);
    const user = await this.findOne(username);
    if (user)
      return user;
    else
      return null;
  }

  async create(user: User): Promise<User | null> {
    const parsedUser: any = {...user};
    parsedUser.birthdate = user.birthdate.toString();
    const insertStatement = 'INSERT INTO USER (username, email, password, name, lastname, ' +
      'birthdate, address, education_level, security_question, security_answer) VALUES (?,?,?,?,?,?,?,?,?,?);';
    await this.db.run(insertStatement, [parsedUser.username, parsedUser.email, parsedUser.password, parsedUser.name, parsedUser.lastname,
      parsedUser.birthdate, parsedUser.address, parsedUser.educationLevel, parsedUser.securityQuestion, parsedUser.securityAnswer]);
    const newUser = await this.findOne(user.username);
    if (newUser)
      return newUser;
    else
      return null;
  }

  async update(user: User): Promise<User | null> {
    const parsedUser: any = {...user};
    parsedUser.birthdate = user.birthdate.toString();
    const updateStatement = 'UPDATE USER SET email=?, password=?, name=?, lastname=?, birthdate=?, address=?, ' +
      'education_level=?, security_question=?, security_answer=? WHERE username=?;';
    await this.db.run(updateStatement, [parsedUser.email, parsedUser.password, parsedUser.name, parsedUser.lastname,
      parsedUser.birthdate, parsedUser.address, parsedUser.educationLevel, parsedUser.securityQuestion, parsedUser.securityAnswer, parsedUser.username]);
    const updatedUser = await this.findOne(user.username);
    if (updatedUser)
      return updatedUser;
    else
      return null;
  }

  async delete(username: string) {
    await this.db.run('DELETE FROM USER WHERE username=?', [username]);
  }
}
