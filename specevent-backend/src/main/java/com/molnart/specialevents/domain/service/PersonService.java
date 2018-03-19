package com.molnart.specialevents.domain.service;

import com.molnart.specialevents.domain.dto.PersonDto;
import com.molnart.specialevents.domain.events.SpecEventEntity;
import com.molnart.specialevents.domain.person.PersonEntity;
import com.molnart.specialevents.domain.person.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

@Service
public class PersonService {

	@Autowired
	private PersonRepository personRepository;
	
	public Set<PersonDto> getPersons() {
		Set<PersonDto> list = new HashSet<PersonDto>();
		Iterable<PersonEntity> persons = personRepository.findAll();
		for (PersonEntity person : persons) {
			list.add(toDto(person));
		}
		return list;
	}
	
	public PersonDto getPerson(String id) {
		return toDto(personRepository.findOne(Long.parseLong(id)));
	}
	
	public void add(PersonDto person) {
		personRepository.save(new PersonEntity(person.getName()));
	}
	
	public PersonEntity delete(String id) {
		PersonEntity person = personRepository.findOne(Long.parseLong(id));
		personRepository.delete(person);
		return person;
	}

	@Transactional
	public void deleteEvent(SpecEventEntity event) {
		for (PersonEntity person: personRepository.findAllByEvents(event)) {
			person.getEvents().remove(event);
		}
	}
	
	private PersonDto toDto(PersonEntity person) {
		return new PersonDto(person.getId(), person.getName());
	}
}
