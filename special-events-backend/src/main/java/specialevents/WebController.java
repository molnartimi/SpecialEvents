package specialevents;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import specialevents.domain.gifts.GiftDto;
import specialevents.domain.person.PersonDto;
import specialevents.domain.events.SpecEventDto;
import specialevents.domain.events.SpecEventEntity;
import specialevents.domain.person.PersonEntity;
import specialevents.service.PersonService;
import specialevents.service.SpecEventService;
import specialevents.service.UserService;

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
	UserService userService;

	// returns only the persons with their ids and names
	@CrossOrigin
	@GetMapping(value = "/persons", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<PersonDto> getPersons(@RequestParam("id") String userId) {
		return personService.getPersons(Long.parseLong(userId));
	}

	// returns one person's datas
	@CrossOrigin
	@GetMapping(value = "/person/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public PersonDto getPerson(@PathVariable("id") Long id) {
		return personService.getPerson(id);
	}



	// Create new person
	@CrossOrigin
	@PostMapping(value = "/new-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public Long addNewPerson(@RequestBody PersonDto person, @RequestParam("id") String userId) {
		Long newId = personService.add(person, userService.find(Long.parseLong(userId)));
		return newId;
	}


	// Edit only the persons's name!
	@CrossOrigin
	@PutMapping(value = "/edit-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean editPerson(@RequestBody PersonDto person) {
		personService.edit(person);
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
}
