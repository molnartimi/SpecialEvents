package specialevents;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

	// returns only the persons with their ids and names
	@GetMapping(value = "/persons", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<PersonDto> getPersons() {
		return personService.getPersons();
	}


	// returns one person's datas
	@GetMapping(value = "/person/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public PersonDto getPerson(@PathVariable("id") Long id) {
		return personService.getPerson(id);
	}


	// Create new person
	@PostMapping(value = "/new-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public Long addNewPerson(@RequestBody PersonDto person) {
		Long newId = personService.add(person);
		return newId;
	}
	

	// Edit only the persons's name!
	@PutMapping(value = "/edit-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean editPerson(@RequestBody PersonDto person) {
		personService.edit(person);
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

}
