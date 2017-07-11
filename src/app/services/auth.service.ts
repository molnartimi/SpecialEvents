/**
 * Created by NB-72 on 2017. 07. 11..
 */

import {Injectable} from "@angular/core";
@Injectable()
export class AuthService {
  private pwd = 'bbb';
  private logged: boolean = false;

  login(p: string): boolean {
    if(this.pwd === p){
      this.logged = true;
      return true;
    }
    else
      return false;
  }

  logout(): void {
    this.logged = false;
  }

  changePwd(old: string, new1: string, new2: string): boolean{
    if(this.pwd === old && new1 === new2){
      this.pwd = new1;
      return true;
    }
    return false;
  }

  isLogged(): boolean {
    return this.logged;
  }
}
