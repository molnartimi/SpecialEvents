import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {PersonDto} from "../common/person.dto";
import {PersonService} from "../services/person.service";

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

    deletePerson(person: PersonDto) {
        this.deleted = true;
        this.personService.deletePerson(person.id).then(success => {
            let index = this.personList.indexOf(person);
            this.personList.splice(index, 1);
        });
    }

    addnew() {
        this.addNewActive = true;
    }

    savePerson() {
        this.addNewActive = false;
        let newPerson = new PersonDto(0, this.newName);
        this.personService.savePerson(newPerson).then(newId => {
            newPerson.id = newId;
            this.personList.push(newPerson);
            this.newName = null;
        });
    }
}
