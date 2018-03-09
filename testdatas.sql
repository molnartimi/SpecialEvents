insert into persons (name)
values ('Timi');

insert into events (day, eventtype, month, person_id)
values (27,0,5, (select id from persons where name='Timi'));
insert into events (day, eventtype, month, person_id)
values (3,1,5, (select id from persons where name='Timi'));


insert into persons (name)
values ('Tomi');

insert into events (day, eventtype, month, person_id)
values (12,0,12, (select id from persons where name='Tomi'));
insert into events (day, eventtype, month, person_id)
values (3,1,7, (select id from persons where name='Tomi'));

insert into persons (name)
values ('Kriszti-Laci');

insert into events (day, eventtype, month, person_id)
values (25,2,8, (select id from persons where name='Kriszti-Laci'));

insert into persons (name)
values ('Apa');

insert into events (day, eventtype, month, person_id)
values (30,0,1, (select id from persons where name='Apa'));

insert into persons (name)
values ('Anya');

insert into events (day, eventtype, month, person_id)
values (20,0,12, (select id from persons where name='Anya'));