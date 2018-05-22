package specialevents;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import specialevents.domain.dto.GiftDto;
import specialevents.domain.dto.PersonDto;
import specialevents.domain.dto.SpecEventDto;
import specialevents.domain.dto.UserDto;
import specialevents.domain.events.SpecEventEntity;
import specialevents.domain.person.PersonEntity;
import specialevents.domain.service.PersonService;
import specialevents.domain.service.SpecEventService;
import specialevents.domain.service.UserService;
import specialevents.domain.user.UserEntity;

import java.security.Principal;
import java.util.Collection;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class WebController {
	@Autowired
	PersonService personService;
	@Autowired
	SpecEventService specEventService;
	@Autowired
	private UserService userService;

	@CrossOrigin
	@PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean createUser(@RequestBody UserDto newUser) {
		if (userService.find(newUser.getUsername()) != null) {
			return false;
		}
		userService.save(newUser);
		return true;
	}

	@CrossOrigin
	@RequestMapping("/login")
	public Principal user(Principal principal) {
		return principal;
	}

	@CrossOrigin
	@RequestMapping("/logout")
	public boolean user() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		authentication.setAuthenticated(false);
		return true;
	}

	// returns only the persons with their ids and names
	@CrossOrigin
	@GetMapping(value = "/persons", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<PersonDto> getPersons(@RequestParam("id") String userId) {
		return personService.getPersons(Long.parseLong(userId));
	}

	// returns all events with all properties
	@CrossOrigin
	@GetMapping(value = "/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public Collection<SpecEventDto> getEvents(@RequestParam("id") String userId) {
		return specEventService.getEvents(personService.getPersonEntities(Long.parseLong(userId)));
	}

	@CrossOrigin
	@GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<UserDto> getEvents() {
		return userService.getUsers();
	}

	@CrossOrigin
	@GetMapping(value = "/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public UserDto getUser(@PathVariable("id") Long userId) {
		return userService.getUser(userId);
	}
	
	// returns one person's events
	@CrossOrigin
	@GetMapping(value = "/person/{id}/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<SpecEventDto> getPersonEvents(@PathVariable("id") Long id) {
		return specEventService.getPersonEvents(id);
	}

	// returns one person's datas
	@CrossOrigin
	@GetMapping(value = "/person/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public PersonDto getPerson(@PathVariable("id") Long id) {
		return personService.getPerson(id);
	}

	// returns one event
	@CrossOrigin
	@GetMapping(value = "/event/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public SpecEventDto getEvent(@PathVariable("id") Long id) {
		return specEventService.getEvent(id);
	}


	// Create new person
	@CrossOrigin
	@PostMapping(value = "/new-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public Long addNewPerson(@RequestBody PersonDto person, @RequestParam("id") String userId) {
		Long newId = personService.add(person, userService.find(Long.parseLong(userId)));
		return newId;
	}
	
	// Create new event
	// Check the person list, create new eventEntity, add entity to persons
	@CrossOrigin
	@PostMapping(value = "/new-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public Long addNewEvent(@RequestBody SpecEventDto event) {
		Set<PersonEntity> persons = personService.toEntity(event.getPersons());
		SpecEventEntity eventEntity = specEventService.addEvent(event, persons);
		personService.addEvent(persons, eventEntity);
		return eventEntity.getId();
	}

	// Edit only the persons's name!
	@CrossOrigin
	@PutMapping(value = "/edit-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean editPerson(@RequestBody PersonDto person) {
		personService.edit(person);
		return true; // TODO false
	}

	@CrossOrigin
	@PutMapping(value = "/edit-user", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean editUser(@RequestBody UserDto user) {
		userService.edit(user);
		return true; // TODO false
	}
	
	// Event modification for all person of event
	@CrossOrigin
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
	@CrossOrigin
	@DeleteMapping(value = "/delete-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deletePerson(@RequestParam("id") String id) {
		Set<SpecEventEntity> entities = personService.delete(id);
		specEventService.deletePerson(entities, id);
		return true;
	}

	// Delete event
	// ALso delete person relations from all persons
	@CrossOrigin
	@DeleteMapping(value = "/delete-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteEvent(@RequestParam("id") String id) {
		SpecEventEntity event = specEventService.getEntity(Long.parseLong(id));
		personService.deleteEvent(event);
		specEventService.delete(id);
		return true;
	}

	@CrossOrigin
	@DeleteMapping(value = "/delete-user", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteUser(@RequestParam("id") String id) {
		for (PersonDto person: personService.getPersons(Long.parseLong(id))) {
			deletePerson(String.valueOf(person.getId()));
		}
		userService.deleteUser(Long.parseLong(id));
		return true;
	}

	// Delete event from one person
	@CrossOrigin
	@DeleteMapping(value = "/delete-event-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteEvent(@RequestParam("personId") String personId, @RequestParam("id") String id) {
		PersonEntity person = personService.deleteEventFromPerson(specEventService.getEntity(Long.parseLong(id)), personId);
		specEventService.deletePersonFromEvent(id, person);
		return true;
	}

	@CrossOrigin
	@GetMapping(value = "gifts", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<GiftDto> getPersonGifts(@RequestParam("id") String id) {
		return personService.getGifts(Long.parseLong(id));
	}

	@CrossOrigin
	@PostMapping(value = "save-gifts", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean savePersonGifts(@RequestBody GiftDto[] gifts, @RequestParam("id") String id) {
		personService.saveGifts(gifts, Long.parseLong(id));
		return true; // TODO false
	}
}
