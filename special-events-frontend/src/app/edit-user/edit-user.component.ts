import {Component, OnInit} from '@angular/core';
import {UserDto} from "../common/user.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.component.css']
})
export class EditUserComponent implements OnInit{
    user: UserDto;
    newPassword: string;

    constructor(private userService: UserService,
                private router: Router,
                private route: ActivatedRoute) {}

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.userService.getUser(Number(id)).then(user => this.user = user);
    }

    saveUser(): void {
        if (this.newPassword) this.user.password = this.newPassword;
        this.userService.editUser(this.user).then(() => this.goBack());
    }

    goBack(): void {
      this.router.navigate(["admin"]);
    }
}
