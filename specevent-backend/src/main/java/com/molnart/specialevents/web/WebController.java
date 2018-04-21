package com.molnart.specialevents.web;

import com.molnart.specialevents.domain.dto.PersonDto;
import com.molnart.specialevents.domain.dto.SpecEventDto;
import com.molnart.specialevents.domain.events.SpecEventEntity;
import com.molnart.specialevents.domain.person.PersonEntity;
import com.molnart.specialevents.domain.service.PersonService;
import com.molnart.specialevents.domain.service.SpecEventService;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class WebController {
	@Autowired
	PersonService personService;
	@Autowired
	SpecEventService specEventService;

	// returns only the persons with their ids and names
	@GetMapping(value = "/persons", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<PersonDto> getPersons() {
		return personService.getPersons();
	}

	// returns all events with all properties
	@GetMapping(value = "/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<SpecEventDto> getEvents() {
		return specEventService.getEvents();
	}
	
	// returns one person's events
	@GetMapping(value = "/person/{id}/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<SpecEventDto> getPersonEvents(@PathVariable("id") Long id) {
		return specEventService.getPersonEvents(id);
	}

	// returns one person's datas
	@GetMapping(value = "/person/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public PersonDto getPerson(@PathVariable("id") Long id) {
		return personService.getPerson(id);
	}
	
	// Create new person
	@PostMapping(value = "/new-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public void addNewPerson(@RequestBody PersonDto person) {
		personService.add(person);
	}
	
	// Create new event
	// Check the person list, create new eventEntity, add entity to persons
	@PostMapping(value = "/new-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public void addNewEvent(@RequestBody SpecEventDto event) {
		Set<PersonEntity> persons = personService.toEntity(event.getPersons());
		SpecEventEntity eventEntity = specEventService.addEvent(event, persons);
		personService.addEvent(persons, eventEntity);
	}

	// Edit only the persons's name!
	@PutMapping(value = "/edit-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public void editPerson(@RequestBody PersonDto person) {
		personService.edit(person);
	}
	
	// Event modification for all person of event
	@PutMapping(value = "/edit-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public void editEvent(@RequestBody SpecEventDto event) {
		specEventService.edit(event);
	}

	// Event modification for one person
	// Create new event for him
	@PutMapping(value = "/edit-person-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public void editEvent(@RequestBody SpecEventDto event, @RequestParam String personId) {
		personService.deleteEventFromPerson(specEventService.getEntity(event.getId()), personId);
		
		Set<PersonDto> person = new HashSet<PersonDto>();
		PersonEntity personEntity = personService.getEntity(personId);
		person.add(new PersonDto(personEntity.getId(), personEntity.getName()));
		
		addNewEvent(new SpecEventDto(event.getId(), null, event.getMonth(), event.getDay(), event.getEventType()));
	}

	// Delete person
	// Also delete event relations from all events
	@DeleteMapping(value = "/delete-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public void deletePerson(@RequestParam("id") String id) {
		PersonEntity person = personService.delete(id);
		specEventService.deletePerson(person);
	}

	// Delete event
	// ALso delete person relations from all persons
	@DeleteMapping(value = "/delete-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public void deleteEvent(@RequestParam("id") String id) {
		SpecEventEntity event = specEventService.delete(id);
		personService.deleteEvent(event);
	}
}
