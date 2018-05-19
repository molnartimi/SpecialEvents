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
import {EditEventComponent} from "./edit-event/edit-event.component";

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
                path: 'event/:id/edit',
                component: EditEventComponent
            },
            {
                path: 'persons',
                component: PersonListComponent
            },
            {
                path: 'person/:id',
                component: PersonEventsComponent,
                children: [
                    {
                        path: '',
                        component: PersonEventListComponent
                    },
                    {
                        path: 'edit',
                        component: PersonEventEditComponent
                    },
                    {   path: 'gifts',
                        component: GiftsComponent
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
