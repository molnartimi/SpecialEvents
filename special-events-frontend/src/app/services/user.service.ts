import {Injectable} from "@angular/core";
import {RsApiService} from "./rs-api.service";
import {UserDto} from "../common/user.dto";
import {Headers, RequestOptions} from "@angular/http";
import {Md5} from "ts-md5";

@Injectable()
export class UserService {
  private URL = "api/userapi/";
  private LOGIN = "login";
  private LOGOUT = "logout";
  private REGISTER = "register";
  private USER = "user";
  private ALL_USERS = "users";
  private DELETE = "delete-user";
  private EDIT = "edit-user";

  private LOCAL_STORAGE_USER_KEY = "currentUser";

  constructor(private rsApiService: RsApiService) {}

  login(user: UserDto): Promise<any> {
    //user.password = Md5.hashStr(user.password, false).toString();
    return this.rsApiService.get(
      this.URL + this.LOGIN,
      function(response) {
        let user = response.json().principal;
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }},
      this.createLoginOptions(user));
  }

  logout(): Promise<any> {
    return this.rsApiService.post(
      this.URL + this.LOGOUT,
      function(){localStorage.removeItem('currentUser');}
    );
  }

  register(user: UserDto): Promise<any> {
    //user.password = Md5.hashStr(user.password, false).toString();
    return this.rsApiService.post(
      this.URL + this.REGISTER,
      function() {},
      user
    );
  }

  getUser(id: number): Promise<UserDto> {
    return this.rsApiService.get(
      this.URL + this.USER + "/" + id,
      function (response) {
        return response.json() as UserDto;
      }
    );
  }

  getUsers(): Promise<UserDto[]> {
    return this.rsApiService.get(
      this.URL + this.ALL_USERS,
      function(response) {
        return response.json() as UserDto[];
      }
    );
  }

  editUser(user: UserDto): Promise<boolean> {
    return this.rsApiService.put(
      this.URL + this.EDIT,
      function(response) {
        return response.json() as boolean;
      },
      user
    );
  }

  deleteUser(id: number): Promise<boolean> {
    let options = RsApiService.createDefaultHttpOptions(id.toString());
    return this.rsApiService.delete(
      this.URL + this.DELETE,
      function(response) {
        return response.json() as boolean;
      },
      options
    );
  }

  get authenticated(): boolean {
    return !!localStorage.getItem(this.LOCAL_STORAGE_USER_KEY)
  }

  get isAdmin(): boolean {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER_KEY)).role === "ADMIN";
  }

  public get currentUserId(): string {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER_KEY)).id.toString();
  }

  private createLoginOptions(user): RequestOptions {
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    let base64Credential: string = btoa( user.username+ ':' + user.password);
    headers.append("Authorization", "Basic " + base64Credential);

    let options = new RequestOptions();
    options.headers=headers;

    return options;
  }
}
