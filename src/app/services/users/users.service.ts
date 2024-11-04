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
    this.createTestUsers();
  }

  async createTestUsers() {
    const users: User[] = testUsers;
    for (const user of users) {
      await this.save(user);
    }
  }

  async findAll(): Promise<User[]> {
    const users: User[] = (await this.db.query('SELECT * FROM USER;')).values as User[];
    return users;
  }

  async findOne(username: string): Promise<User | undefined> {
    const users: User[] = (await this.db.query('SELECT * FROM USER WHERE username=?;', [username])).values as User[];
    return users[0];
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const users: User[] = (await this.db.query('SELECT * FROM USER WHERE email=?;', [email])).values as User[];
    return users[0];
  }

  async changePassword(username: string, newPassword: string): Promise<User | null> {
    await this.db.run('UPDATE USER SET password=? WHERE username=?;', [newPassword, username]);
    const user = await this.findOne(username);
    if (user)
      return user;
    else
      return null;
  }

  async save(user: User): Promise<User | null> {
    const insertStatement = 'INSERT OR REPLACE INTO USER (username, email, password, name, lastname, ' +
      'birthdate, education_level, security_question, security_answer) VALUES (?,?,?,?,?,?,?,?,?);';
    await this.db.run(insertStatement, [user.username, user.email, user.password, user.name, user.lastname,
      user.birthdate, user.educationLevel, user.securityQuestion, user.securityAnswer]);
    const newUser = await this.findOne(user.username);
    if (newUser)
      return newUser;
    else
      return null;
  }

  async delete(username: string) {
    await this.db.run('DELETE FROM USER WHERE username=?', [username]);
  }
}
