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

	public SpecEventEntity getEntity(long id) {
		return specEventRepository.findOne(id);
	}
	
	public Set<SpecEventDto> getEvents() {
		Set<SpecEventDto> result = new HashSet<SpecEventDto>();
		for (SpecEventEntity event: specEventRepository.findAll()) {
			result.add(toDto(event));
		}
		return result;
	}
	
	public Set<SpecEventDto> getPersonEvents(long id) {
		Set<SpecEventDto> result = new HashSet<SpecEventDto>();
		for (SpecEventEntity event: specEventRepository.findAllByPersons_Id(id)) {
			result.add(toDto(event));
		}
		return result;
	}
	
	public SpecEventEntity addEvent(SpecEventDto event, Set<PersonEntity> toPersons) {
		SpecEventEntity newEntity = new SpecEventEntity(toPersons, event.getMonth(), event.getDay(), event.getEventType());
		specEventRepository.save(newEntity);
		return newEntity;
	}
	
	@Transactional
	public void edit(SpecEventDto event) {
		SpecEventEntity entity = specEventRepository.findOne(event.getId());
		if (entity != null) {
			entity.setMonth(event.getMonth());
			entity.setDay(event.getDay());
			entity.setEventType(event.getEventType());
		}
	}

	public SpecEventEntity delete(String id) {
		SpecEventEntity event = specEventRepository.findOne(Long.parseLong(id));
		specEventRepository.delete(event);
		return event;
	}

	@Transactional
	public void deletePerson(Set<SpecEventEntity> entites, String personId) {
		for (SpecEventEntity event: entites) {
			if (event.getPersons().size() == 0) {
				specEventRepository.delete(event); 
			}
		}
	}

	@Transactional
	public void deletePersonFromEvent(String id, PersonEntity person) {
		SpecEventEntity event = specEventRepository.findOne(Long.parseLong(id));
		event.getPersons().remove(person);
		if (event.getPersons().size() == 0) {
			specEventRepository.delete(event);
		}
	}
	
	
	public static SpecEventDto toDto(SpecEventEntity event) {
		Set<PersonDto> persons = new HashSet<PersonDto>();
		for (PersonEntity person: event.getPersons()) {
			persons.add(new PersonDto(person.getId(), person.getName()));
		}
		return new SpecEventDto(event.getId(),
								persons,
								event.getMonth(),
								event.getDay(),
								event.getEventType().toString());
	}
}
