package specialevents.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import specialevents.domain.person.PersonDto;
import specialevents.domain.events.SpecEventDto;
import specialevents.domain.events.SpecEventEntity;
import specialevents.domain.events.SpecEventRepository;
import specialevents.domain.person.PersonEntity;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class SpecEventService {
	
	@Autowired
	SpecEventRepository specEventRepository;

	public SpecEventEntity getEntity(long id) {
		return specEventRepository.findById(id).get();
	}
	
	public Collection<SpecEventDto> getEvents(Iterable<PersonEntity> persons) {
		Map<Long, SpecEventDto> result= new HashMap<>();
		for (PersonEntity person: persons) {
			for (SpecEventEntity event: specEventRepository.findAllByPersons(person)) {
				result.put(event.getId(), toDto(event));
			}
		}
		return result.values();
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
	public void edit(SpecEventDto event, Set<PersonEntity> persons) {
		SpecEventEntity entity = specEventRepository.findById(event.getId()).get();
		if (entity != null) {
			entity.setMonth(event.getMonth());
			entity.setDay(event.getDay());
			entity.setEventType(event.getEventType());
			entity.setPersons(persons);
		}
	}

	public SpecEventEntity delete(String id) {
		SpecEventEntity event = specEventRepository.findById(Long.parseLong(id)).get();
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
		SpecEventEntity event = specEventRepository.findById(Long.parseLong(id)).get();
		event.getPersons().remove(person);
		if (event.getPersons().size() == 0) {
			specEventRepository.delete(event);
		}
	}

	public boolean isEventChanged(SpecEventDto event) {
		SpecEventEntity eventEntity = specEventRepository.findById(event.getId()).get();
		return eventEntity.getMonth() != event.getMonth() ||
				eventEntity.getDay() != event.getDay() ||
				!eventEntity.getEventType().equals(event.getEventType());
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

    public SpecEventDto getEvent(Long id) {
		return toDto(this.specEventRepository.findById(id).get());
    }
}
