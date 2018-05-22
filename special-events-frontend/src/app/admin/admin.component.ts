/**
 * Created by NB-72 on 2017. 07. 05..
 */

import {Component, OnInit} from '@angular/core'
import {RsApiService} from "../services/rs-api.service";
import {Router} from "@angular/router";
import {SpecEventDto} from "../common/spec-event.dto";
import {PersonDto} from "../common/person.dto";
import {UserDto} from "../common/user.dto";

@Component({
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
    users: UserDto[];

    constructor(private rsApiService: RsApiService,
                private router: Router) {
    }

    ngOnInit(): void {
      this.rsApiService.getUsers().then(response => this.users = response);
    }

    deleteUser(user: UserDto): void {
         this.rsApiService.deleteUser(user.id).then(success => {
             let index = this.users.indexOf(user);
             this.users.splice(index, 1);
         });
    }

    saveUser(user: UserDto): void {

    }

    goToUser(user: UserDto): void {
      this.router.navigate(["user", user.id, "edit"]);
    }

    update(): void {
        this.rsApiService.getUsers().then(response => {
            this.users = response;
        });
    }

    get currentUserId(): number {
      return Number(this.rsApiService.currentUserId);
    }
}
