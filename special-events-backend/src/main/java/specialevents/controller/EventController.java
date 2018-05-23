package specialevents.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import specialevents.domain.events.SpecEventDto;
import specialevents.domain.events.SpecEventEntity;
import specialevents.domain.person.PersonEntity;
import specialevents.service.PersonService;
import specialevents.service.SpecEventService;

import java.util.Collection;
import java.util.Set;

@RestController
@RequestMapping("/api/eventapi")
public class EventController {
	@Autowired
	PersonService personService;
	@Autowired
	SpecEventService specEventService;
	
	@GetMapping(value = "/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<SpecEventDto> getEvents(@RequestParam("id") String userId,
											  @RequestParam("person") String personFilter,
											  @RequestParam("month") String monthFilter,
											  @RequestParam("type") String typeFilter) {
		return specEventService.getEvents(
				personService.getPersonEntities(Long.parseLong(userId)),
				personFilter, monthFilter, typeFilter
		);
	}

	
	@GetMapping(value = "/event/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public SpecEventDto getEvent(@PathVariable("id") Long id) {
		return specEventService.getEvent(id);
	}
	
	
	@GetMapping(value = "/person/{id}/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<SpecEventDto> getPersonEvents(@PathVariable("id") Long id) {
		return specEventService.getPersonEvents(id);
	}

	
	@PostMapping(value = "/new-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public Long addNewEvent(@RequestBody SpecEventDto event) {
		Set<PersonEntity> persons = personService.toEntity(event.getPersons());
		SpecEventEntity eventEntity = specEventService.addEvent(event, persons);
		personService.addEvent(persons, eventEntity);
		return eventEntity.getId();
	}

	
	@PutMapping(value = "/edit-events", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean editEvent(@RequestBody SpecEventDto[] events) {
		for (SpecEventDto event: events) {
			Set<PersonEntity> persons = this.personService.toEntity(event.getPersons());
			specEventService.edit(event, persons);
			personService.editEvent(persons, specEventService.getEntity(event.getId()));
		}
		return true;
	}

	
	@DeleteMapping(value = "/delete-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteEvent(@RequestParam("id") String id) {
		SpecEventEntity event = specEventService.getEntity(Long.parseLong(id));
		personService.deleteEvent(event);
		specEventService.delete(id);
		return true;
	}

	
	@DeleteMapping(value = "/delete-person-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteEvent(@RequestParam("personId") String personId, @RequestParam("id") String id) {
		PersonEntity person = personService.deleteEventFromPerson(specEventService.getEntity(Long.parseLong(id)), personId);
		specEventService.deletePersonFromEvent(id, person);
		return true;
	}

}
