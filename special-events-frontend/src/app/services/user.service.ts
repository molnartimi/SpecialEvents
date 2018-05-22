import {Injectable} from "@angular/core";
import {RsApiService} from "./rs-api.service";
import {UserDto} from "../common/user.dto";
import {Headers, RequestOptions, URLSearchParams} from "@angular/http";

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
    let options = this.createDefaultHttpOptions(id.toString());
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



  private createHttpOptions(paramNames: string[], paramValues: string[]): RequestOptions {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let myParams = new URLSearchParams();
    for (let i in paramNames) {
      myParams.append(paramNames[i], paramValues[i]);
    }
    return new RequestOptions({headers: myHeaders, params: myParams});
  }

  private createDefaultHttpOptions(id: string): RequestOptions {
    return this.createHttpOptions(['id'], [id]);
  }
}
