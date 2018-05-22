/**
 * Created by NB-72 on 2017. 07. 04..
 */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RsApiService} from "../services/rs-api.service";
import {SpecEventDto} from "../common/spec-event.dto";
import {PersonDto} from "../common/person.dto";
import {UserDto} from "../common/user.dto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.component.css']
})
export class EditUserComponent implements OnInit{
    user: UserDto;
    newPassword: string;

    constructor(private rsApiService: RsApiService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.rsApiService.getUser(Number(id)).then(user => this.user = user);
    }

    saveUser(): void {
        if (this.newPassword) this.user.password = this.newPassword;
        this.rsApiService.editUser(this.user).then(() => this.goBack());
    }

    goBack(): void {
      this.router.navigate(["admin"]);
    }
}
