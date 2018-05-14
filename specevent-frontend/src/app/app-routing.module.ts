/**
 * Created by NB-72 on 2017. 07. 06..
 */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {EventListComponent} from "./event-list/event-list.component";
import {PersonListComponent} from "./person-list/persons.component";
import {GiftsComponent} from "./gifts/gifts.component";
import {PersonEventListComponent} from "./person-events/person-events-list/person-event-list.component";
import {PersonEventsComponent} from "./person-events/person-events.component";
import {PersonEventEditComponent} from "./person-events/person-event-edit/person-event-edit.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'events',
                component: EventListComponent
            },
            {
                path: '',
                redirectTo: '/events',
                pathMatch: 'full'
            },
            {
                path: 'persons',
                component: PersonListComponent
            },
            {
                path: 'person',
                component: PersonEventsComponent,
                children: [
                    {
                        path: ':id',
                        component: PersonEventListComponent
                    },
                    {
                        path: ':id/edit',
                        component: PersonEventEditComponent
                    }
                ]
            },
            {path: 'person/:id/gifts', component: GiftsComponent}
            ]
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
