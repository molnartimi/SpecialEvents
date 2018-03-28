/**
 * Created by NB-72 on 2017. 07. 06..
 */

import {Component, OnInit} from "@angular/core";
import {PersonService} from "../services/person.service";
import {Router} from "@angular/router";
import {PersonDto} from "../common/person.dto";

@Component({
    templateUrl: 'persons.component.html',
    styleUrls: ['persons.component.css']
})
export class PersonListComponent implements OnInit {
    personList: PersonDto[];
    newName: string;
    addNewActive: boolean = false;
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

    goToHints(person): void {
        this.router.navigate(['person', person.id, 'gifts']);
    }

    deletePerson(id: number) {
        this.deleted = true;
        this.personService.deletePerson(id).then(() => {
            this.personService.getPersons().then(persons => this.personList = persons);
        });
    }
    
    addnew() {
        this.addNewActive = true;
    }
    
    savePerson() {
        this.addNewActive = false;
        this.personService.savePerson(new PersonDto(0, this.newName)).then(() => {
            this.personService.getPersons().then(persons => this.personList = persons);
            this.newName = null;
        });
    }
}
