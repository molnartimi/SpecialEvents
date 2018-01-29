package com.molnart.specialevents.web;

import com.molnart.specialevents.domain.dto.SpecEventDto;
import com.molnart.specialevents.domain.events.SpecEventEntity;
import com.molnart.specialevents.domain.events.SpecEventRepository;
import com.molnart.specialevents.domain.person.PersonEntity;
import com.molnart.specialevents.domain.person.PersonRepository;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class WebController {
	@Autowired
	PersonRepository personRepository;
	@Autowired
	SpecEventRepository eventRepository;

	@RequestMapping("/")
	String home() {
		return "Hello World!";
	}

	@RequestMapping("/save")
	public String process(){
		/*PersonEntity p = new PersonEntity("Kriszti");
		EventEntity unnep = new EventEntity(p, 8, 5, EventTypeEnum.NAMEDAY);
		
		personRepository.save(p);
		eventRepository.save(unnep);*/
		/*personRepository.save(new PersonEntity("Tomi"));
		personRepository.save(new PersonEntity("Anya"));
		personRepository.save(new PersonEntity("Apa"));
		personRepository.save(new PersonEntity("Kriszti"));*/
		return "Done";
	}
	
	@GetMapping(value = "/persons", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<PersonEntity> getPersons() {
		List<PersonEntity> list = new ArrayList<PersonEntity>();
		Iterable<PersonEntity> persons = personRepository.findAll();
		for (PersonEntity person : persons) {
			list.add(person);
		}
		return list;
	}
	
	@GetMapping(value = "/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SpecEventDto> getEvents() {
		List<SpecEventDto> list = new ArrayList<SpecEventDto>();
		for (SpecEventEntity event: eventRepository.findAll()) {
			list.add(new SpecEventDto(event.getId(),
					event.getPerson().getName(),
					event.getMonth(),
					event.getDay(),
					event.getEventType()));
		}
		return list;
	}

	@RequestMapping("/findall")
	public String findPersons() {
		String result = "<html>";
		
		for (PersonEntity person : personRepository.findAll()) {
			result += "<div>" + person.getName() + "</div>";
		}
		
		return result + "</html>";
	}

	/*@RequestMapping("/findbyid")
	public String findById(@RequestParam("id") long id){
		String result = "";
		result = repository.findOne(id).toString();
		return result;
	}

	@RequestMapping("/findbylastname")
	public String fetchDataByLastName(@RequestParam("lastname") String lastName){
		String result = "<html>";

		for(Customer cust: repository.findByLastName(lastName)){
			result += "<div>" + cust.toString() + "</div>";
		}

		return result + "</html>";
	}*/

}
