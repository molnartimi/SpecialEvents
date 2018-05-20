package specialevents;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import specialevents.domain.dto.GiftDto;
import specialevents.domain.dto.PersonDto;
import specialevents.domain.dto.SpecEventDto;
import specialevents.domain.events.SpecEventEntity;
import specialevents.domain.person.PersonEntity;
import specialevents.domain.service.PersonService;
import specialevents.domain.service.SpecEventService;

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

	// returns one event
	@GetMapping(value = "/event/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public SpecEventDto getEvent(@PathVariable("id") Long id) {
		return specEventService.getEvent(id);
	}


	// Create new person
	@PostMapping(value = "/new-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public Long addNewPerson(@RequestBody PersonDto person) {
		Long newId = personService.add(person);
		return newId;
	}
	
	// Create new event
	// Check the person list, create new eventEntity, add entity to persons
	@PostMapping(value = "/new-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public Long addNewEvent(@RequestBody SpecEventDto event) {
		Set<PersonEntity> persons = personService.toEntity(event.getPersons());
		SpecEventEntity eventEntity = specEventService.addEvent(event, persons);
		personService.addEvent(persons, eventEntity);
		return eventEntity.getId();
	}

	// Edit only the persons's name!
	@PutMapping(value = "/edit-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean editPerson(@RequestBody PersonDto person) {
		personService.edit(person);
		return true; // TODO false
	}
	
	// Event modification for all person of event
	@PutMapping(value = "/edit-events", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean editEvent(@RequestBody SpecEventDto[] events) {
		for (SpecEventDto event: events) {
			Set<PersonEntity> persons = this.personService.toEntity(event.getPersons());
			specEventService.edit(event, persons);
			personService.editEvent(persons, specEventService.getEntity(event.getId()));
		}
		return true; // TODO false
	}

	// Delete person
	// Also delete event relations from all events
	@DeleteMapping(value = "/delete-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deletePerson(@RequestParam("id") String id) {
		Set<SpecEventEntity> entities = personService.delete(id);
		specEventService.deletePerson(entities, id);
		return true;
	}

	// Delete event
	// ALso delete person relations from all persons
	@DeleteMapping(value = "/delete-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteEvent(@RequestParam("id") String id) {
		SpecEventEntity event = specEventService.getEntity(Long.parseLong(id));
		personService.deleteEvent(event);
		specEventService.delete(id);
		return true;
	}

	// Delete event from one person
	@DeleteMapping(value = "/delete-event-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteEvent(@RequestParam("personId") String personId, @RequestParam("id") String id) {
		PersonEntity person = personService.deleteEventFromPerson(specEventService.getEntity(Long.parseLong(id)), personId);
		specEventService.deletePersonFromEvent(id, person);
		return true;
	}

	@GetMapping(value = "gifts", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<GiftDto> getPersonGifts(@RequestParam("id") String id) {
		return personService.getGifts(Long.parseLong(id));
	}

	@PostMapping(value = "save-gifts", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean savePersonGifts(@RequestBody GiftDto[] gifts, @RequestParam("id") String id) {
		personService.saveGifts(gifts, Long.parseLong(id));
		return true; // TODO false
	}
}
