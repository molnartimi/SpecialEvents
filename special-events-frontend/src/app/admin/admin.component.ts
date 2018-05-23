import {Component, OnInit} from '@angular/core'
import {Router} from "@angular/router";
import {UserDto} from "../common/user.dto";
import {UserService} from "../services/user.service";

@Component({
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
    users: UserDto[];

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void {
      this.userService.getUsers().then(response => this.users = response);
    }

    deleteUser(user: UserDto): void {
         this.userService.deleteUser(user.id).then(success => {
             let index = this.users.indexOf(user);
             this.users.splice(index, 1);
         });
    }

    goToUser(user: UserDto): void {
      this.router.navigate(["user", user.id, "edit"]);
    }

    get currentUserId(): number {
      return Number(this.userService.currentUserId);
    }
}
