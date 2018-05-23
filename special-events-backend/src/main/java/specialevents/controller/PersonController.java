package specialevents.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import specialevents.domain.events.SpecEventEntity;
import specialevents.domain.person.PersonDto;
import specialevents.service.PersonService;
import specialevents.service.SpecEventService;
import specialevents.service.UserService;

import java.util.Set;

@RestController
@RequestMapping("/api/personapi")
public class PersonController {
	@Autowired
	PersonService personService;
	@Autowired
	SpecEventService specEventService;
	@Autowired
	UserService userService;


	@CrossOrigin
	@GetMapping(value = "/persons", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<PersonDto> getPersons(@RequestParam("id") String userId) {
		return personService.getPersons(Long.parseLong(userId));
	}


	@CrossOrigin
	@GetMapping(value = "/person/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public PersonDto getPerson(@PathVariable("id") Long id) {
		return personService.getPerson(id);
	}


	@CrossOrigin
	@PostMapping(value = "/new-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public Long addNewPerson(@RequestBody PersonDto person, @RequestParam("id") String userId) {
		return personService.add(person, userService.find(Long.parseLong(userId)));
	}


	@CrossOrigin
	@PutMapping(value = "/edit-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean editPerson(@RequestBody PersonDto person) {
		personService.edit(person);
		return true;
	}


	@CrossOrigin
	@DeleteMapping(value = "/delete-person", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deletePerson(@RequestParam("id") String id) {
		Set<SpecEventEntity> entities = personService.delete(id);
		specEventService.deletePerson(entities, id);
		return true;
	}
}
