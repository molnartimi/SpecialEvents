package specialevents.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import specialevents.domain.events.SpecEventEntity;
import specialevents.domain.person.PersonDto;
import specialevents.domain.user.UserDto;
import specialevents.service.PersonService;
import specialevents.service.SpecEventService;
import specialevents.service.UserService;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/userapi")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private PersonService personService;
	@Autowired
	private SpecEventService specEventService;

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
	@GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<UserDto> getEvents() {
		return userService.getUsers();
	}


	@CrossOrigin
	@GetMapping(value = "/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public UserDto getUser(@PathVariable("id") Long userId) {
		return userService.getUser(userId);
	}


	@CrossOrigin
	@PutMapping(value = "/edit-user", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean editUser(@RequestBody UserDto user) {
		userService.edit(user);
		return true;
	}


	@CrossOrigin
	@DeleteMapping(value = "/delete-user", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean deleteUser(@RequestParam("id") String id) {
		for (PersonDto person: personService.getPersons(Long.parseLong(id))) {
			Set<SpecEventEntity> entities = personService.delete(String.valueOf(person.getId()));
			specEventService.deletePerson(entities, String.valueOf(person.getId()));
		}
		userService.deleteUser(Long.parseLong(id));
		return true;
	}

}
