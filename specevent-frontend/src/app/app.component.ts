import {Component,} from '@angular/core';
import {GiftsService} from "./services/gifts.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'Special events';
}


