import { Injectable, inject } from '@angular/core';
import { SqliteService } from '../database/sqlite.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class InitAppService {
  private readonly sqlite = inject(SqliteService);
  private readonly users = inject(UsersService);

  isAppInit: boolean = false;
  platform!: string;

  async inicializarAplicacion() {
    try {
      await this.sqlite.initPlugin().then(async (ret) => {
        this.platform = this.sqlite.platform;
        if( this.sqlite.platform === 'web') {
          await this.sqlite.initWebStorage();
        }
        await this.users.initDb().then(async () => {
          if( this.sqlite.platform === 'web') {
            await this.sqlite.saveDbName(this.users.dbName);
          }
          this.isAppInit = true;
        });
      });
    } catch(error: any) {
      console.log(error);
    };
  }
}

