package com.molnart.specialevents.domain.service;

import com.molnart.specialevents.domain.dto.PersonDto;
import com.molnart.specialevents.domain.dto.SpecEventDto;
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
	
	public PersonEntity getEntity(String id) {
		return personRepository.findOne(Long.parseLong(id));
	}
	
	public Set<PersonDto> getPersons() {
		Set<PersonDto> list = new HashSet<PersonDto>();
		Iterable<PersonEntity> persons = personRepository.findAll();
		for (PersonEntity person : persons) {
			list.add(toDto(person));
		}
		return list;
	}
	
	public void add(PersonDto person) {
		personRepository.save(new PersonEntity(person.getName()));
	}
	
	@Transactional
	public void addEvent(Set<PersonEntity> persons, SpecEventEntity eventEntity) {
		for (PersonEntity p: persons) {
			personRepository.findOne(p.getId()).addEvent(eventEntity);
		}
	}
	
	@Transactional
	public void edit(PersonDto person) {
		PersonEntity entity = personRepository.findOne(person.getId());
		if (entity != null) {
			entity.setName(person.getName());
		}
	}
	
	public PersonEntity delete(String id) {
		PersonEntity person = personRepository.findOne(Long.parseLong(id));
		personRepository.delete(person);
		return person;
	}

	public void deleteEventFromPerson(SpecEventEntity event, String personId) {
		PersonEntity person = personRepository.findOne(Long.parseLong(personId));
		person.getEvents().remove(event);
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
	
	public PersonEntity toEntity(PersonDto person) {
		return personRepository.findOne(person.getId());
	}
	
	public Set<PersonEntity> toEntity(Set<PersonDto> persons) {
		Set<PersonEntity> result = new HashSet<PersonEntity>();
		for (PersonDto p: persons) {
			result.add(personRepository.findOne(p.getId()));
		}
		return result;
	}
}
