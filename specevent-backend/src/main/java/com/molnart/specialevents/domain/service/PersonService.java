package com.molnart.specialevents.domain.service;

import com.molnart.specialevents.domain.dto.PersonDto;
import com.molnart.specialevents.domain.dto.SpecEventDto;
import com.molnart.specialevents.domain.events.SpecEventEntity;
import com.molnart.specialevents.domain.person.PersonEntity;
import com.molnart.specialevents.domain.person.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

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
	
	public Long add(PersonDto person) {
		PersonEntity newPerson = new PersonEntity(person.getName());
		personRepository.save(newPerson);
		return newPerson.getId();
	}

	public PersonDto getPerson(Long id) {
		return toDto(personRepository.findOne(id));
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
	
	public Set<SpecEventEntity> delete(String id) {
		PersonEntity person = personRepository.findOne(Long.parseLong(id));
		personRepository.delete(person);
		return person.getEvents();
	}

	public PersonEntity deleteEventFromPerson(SpecEventEntity event, String personId) {
		PersonEntity person = personRepository.findOne(Long.parseLong(personId));
		person.getEvents().remove(event);
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

	@Transactional
	public void editEvent(Set<PersonEntity> persons, SpecEventEntity event) {
		List<PersonEntity> personEntities = Arrays.asList(personRepository.findAllByEvents_Id(event.getId()));
		for (PersonEntity person: personEntities) {
			if (!persons.contains(person)) {
				person.getEvents().remove(event);
			}
		}
		for (PersonEntity person: persons) {
			if (!personEntities.contains(person)) {
				person.addEvent(event);
			}
		}
	}
}
