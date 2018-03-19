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
import java.util.Set;

@RestController
@RequestMapping("/api")
public class WebController {
	@Autowired
	PersonService personService;
	@Autowired
	SpecEventService specEventService;
	
	@GetMapping(value = "/persons", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<PersonDto> getPersons() {
		return personService.getPersons();
	}
	
	@GetMapping(value = "/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<SpecEventDto> getEvents() {
		return specEventService.getEvents();
	}
	
	@GetMapping(value = "/persons/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public PersonDto getPerson(@PathParam("id") String id){
		return personService.getPerson(id);
	}
	
	@GetMapping(value = "/person/{id}/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<SpecEventDto> getPersonEvents(@PathParam("id") String id) {
		return specEventService.getPersonEvents(id);
	}
	
	@PostMapping(value = "/new-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public void addNewPerson(@RequestBody PersonDto person) {
		personService.add(person);
	}
	
	@PostMapping(value = "/new-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public void addNewEvent(@RequestBody SpecEventDto event) {
		specEventService.add(event);
	}

	@DeleteMapping(value = "/delete-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public void deletePerson(@RequestParam("id") String id) {
		PersonEntity person = personService.delete(id);
		specEventService.deletePerson(person);
	}

	@DeleteMapping(value = "/delete-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public void deleteEvent(@RequestParam("id") String id) {
		SpecEventEntity event = specEventService.delete(id);
		personService.deleteEvent(event);
	}
}
