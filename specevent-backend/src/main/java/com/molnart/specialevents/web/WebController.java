package com.molnart.specialevents.web;

import com.molnart.specialevents.domain.dto.PersonDto;
import com.molnart.specialevents.domain.dto.PersonWithEventsDto;
import com.molnart.specialevents.domain.dto.SpecEventDto;
import com.molnart.specialevents.domain.events.SpecEventEntity;
import com.molnart.specialevents.domain.events.SpecEventRepository;
import com.molnart.specialevents.domain.events.SpecEventTypeEnum;
import com.molnart.specialevents.domain.person.PersonEntity;
import com.molnart.specialevents.domain.person.PersonRepository;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class WebController {
	@Autowired
	PersonRepository personRepository;
	@Autowired
	SpecEventRepository eventRepository;
	
	@GetMapping(value = "/persons", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<PersonDto> getPersons() {
		List<PersonDto> list = new ArrayList<PersonDto>();
		Iterable<PersonEntity> persons = personRepository.findAll();
		for (PersonEntity person : persons) {
			list.add(convertPersonEntityToDto(person));
		}
		return list;
	}
	
	@GetMapping(value = "/events", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<SpecEventDto> getEvents() {
		List<SpecEventDto> list = new ArrayList<SpecEventDto>();
		for (SpecEventEntity event: eventRepository.findAll()) {
			list.add(convertSpecEventEntityToDto(event));
		}
		return list;
}

	@GetMapping(value = "/person", produces = MediaType.APPLICATION_JSON_VALUE)
	public PersonWithEventsDto getPerson(@RequestParam("id") String id){
		PersonEntity person = personRepository.findOne(Long.parseLong(id));
		List<SpecEventDto> list = new ArrayList<SpecEventDto>();
		for (SpecEventEntity event: eventRepository.findAllByPerson(person)) {
			list.add(convertSpecEventEntityToDto(event));
		}
		return new PersonWithEventsDto(person.getId(), person.getName(), list);
	}
	
	@PostMapping(value = "/new-event", produces = MediaType.APPLICATION_JSON_VALUE)
	public void addNewEvent(@RequestBody SpecEventDto event) {
		PersonEntity person = personRepository.findOneByName(event.getName());
		if (person == null) {
			person = new PersonEntity(event.getName());
			personRepository.save(person);
		}
		eventRepository.save(convertSpecEventDtoToEntity(event, person));
	}

	private SpecEventDto convertSpecEventEntityToDto(SpecEventEntity event) {
		return new SpecEventDto(event.getId(),
				event.getPerson().getName(),
				event.getMonth(),
				event.getDay(),
				event.getEventType().value);
	}
	
	private PersonDto convertPersonEntityToDto(PersonEntity person) {
		return new PersonDto(person.getId(), person.getName());
	}
	
	private SpecEventEntity convertSpecEventDtoToEntity(SpecEventDto event, PersonEntity person) {
		return new SpecEventEntity(person, event.getMonth(), event.getDay(), SpecEventTypeEnum.from(event.getEventType()));
	}
}
