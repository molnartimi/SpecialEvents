package specialevents.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import specialevents.domain.gifts.GiftDto;
import specialevents.service.PersonService;

import java.util.Set;

@RestController
@RequestMapping("/api/giftapi")
public class GiftController {
	@Autowired
	PersonService personService;

	@GetMapping(value = "gifts", produces = MediaType.APPLICATION_JSON_VALUE)
	public Set<GiftDto> getPersonGifts(@RequestParam("id") String id) {
		return personService.getGifts(Long.parseLong(id));
	}

	@PostMapping(value = "save-gifts", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean savePersonGifts(@RequestBody GiftDto[] gifts, @RequestParam("id") String id) {
		personService.saveGifts(gifts, Long.parseLong(id));
		return true;
	}
}
