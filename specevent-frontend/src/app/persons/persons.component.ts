/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, OnInit} from "@angular/core";
import {PersonService} from "../services/person.service";
import {Person} from "../common/person";
import {Router} from "@angular/router";

@Component({
    templateUrl: 'persons.component.html',
    styleUrls: ['persons.component.css']
})
export class PersonListComponent implements OnInit {
    personList: Person[];
    private deleted: boolean = false;

    constructor(private personService: PersonService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.personService.getPersons().then(persons => this.personList = persons);
    }

    onSelect(p): void {
        if (!this.deleted)
            this.router.navigate(['person', p.id]);
        else
            this.deleted = false;
    }

    goToHints(person: Person): void {
        this.router.navigate(['person', person.id, 'gifts']);
    }

    deletePerson(id: number) {
        this.deleted = true;
        this.personService.deletePerson(id).then(() => {
            this.personService.getPersons().then(persons => this.personList = persons);
        });
    }
}
