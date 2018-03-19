package com.molnart.specialevents.domain.service;

import com.molnart.specialevents.domain.dto.PersonDto;
import com.molnart.specialevents.domain.dto.SpecEventDto;
import com.molnart.specialevents.domain.events.SpecEventEntity;
import com.molnart.specialevents.domain.events.SpecEventRepository;
import com.molnart.specialevents.domain.events.SpecEventTypeEnum;
import com.molnart.specialevents.domain.person.PersonEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@Service
public class SpecEventService {
	
	@Autowired
	SpecEventRepository specEventRepository;

	public Set<SpecEventDto> getEvents() {
		Set<SpecEventDto> result = new HashSet<SpecEventDto>();
		for (SpecEventEntity event: specEventRepository.findAll()) {
			result.add(toDto(event))
			;
		}
		return result;
	}
	
	public Set<SpecEventDto> getPersonEvents(String id) {
		Set<SpecEventDto> result = new HashSet<SpecEventDto>();
		for (SpecEventEntity event: specEventRepository.findAllByPersons_Id(Long.parseLong(id))) {
			result.add(toDto(event));
		}
		return result;
	}
	
	public void add(SpecEventDto event) {
		Set<PersonEntity> persons = new HashSet<PersonEntity>();
		for (PersonDto person: event.getPersons()) {
			persons.add(new PersonEntity(person.getName()));
		}
		specEventRepository.save(new SpecEventEntity(persons, event.getMonth(), event.getDay(), SpecEventTypeEnum.valueOf(event.getEventType())));
	}

	public SpecEventEntity delete(String id) {
		SpecEventEntity event = specEventRepository.findOne(Long.parseLong(id));
		specEventRepository.delete(event);
		return event;
	}

	@Transactional
	public void deletePerson(PersonEntity person) {
		for (SpecEventEntity event: specEventRepository.findAllByPersons(person)) {
			event.getPersons().remove(person);
		}
	}
	
	
	private SpecEventDto toDto(SpecEventEntity event) {
		Set<PersonDto> persons = new HashSet<PersonDto>();
		for (PersonEntity person: event.getPersons()) {
			persons.add(new PersonDto(person.getId(), person.getName()));
		}
		return new SpecEventDto(event.getId(),
				persons,
				event.getMonth(),
				event.getDay(),
				event.getEventType().value);
	}
}
