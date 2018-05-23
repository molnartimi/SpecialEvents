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
	
	public Collection<SpecEventDto> getEvents(Iterable<PersonEntity> persons,
											  String personFilter,
											  String monthFilter,
											  String typeFilter) {
		Map<Long, SpecEventDto> result= new HashMap<>();
		for (PersonEntity person: persons) {
			for (SpecEventEntity event: specEventRepository.findAllByPersons(person)) {
				if (meetFilter(event, personFilter, monthFilter, typeFilter))
					result.put(event.getId(), toDto(event));
			}
		}
		ArrayList<SpecEventDto> events = new ArrayList<>(result.values());
		Collections.sort(events, new EventComparator());
		return events;
	}

	private boolean meetFilter(SpecEventEntity event, String personFilter, String monthFilter, String typeFilter) {
		if (personFilter != null && !personFilter.isEmpty() && !containsPerson(event.getPersons(), personFilter))
			return false;
		if (monthFilter != null && !monthFilter.isEmpty() && event.getMonth() != Integer.valueOf(monthFilter))
			return false;
		if (typeFilter != null && !typeFilter.isEmpty() && !typeFilter.equals(event.getEventType()))
			return false;
		return true;
	}

	private boolean containsPerson(Set<PersonEntity> persons, String personFilter) {
		for (PersonEntity person: persons) {
			if (person.getName().toUpperCase().contains(personFilter.toUpperCase()))
				return true;
		}
		return false;
	}

	public Collection<SpecEventDto> getPersonEvents(long id) {
		Set<SpecEventDto> result = new HashSet<SpecEventDto>();
		for (SpecEventEntity event: specEventRepository.findAllByPersons_Id(id)) {
			result.add(toDto(event));
		}
		ArrayList<SpecEventDto> events = new ArrayList<>(result);
		Collections.sort(events, new EventComparator());
		return events;
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

	private class EventComparator implements Comparator<SpecEventDto> {

		@Override
		public int compare(SpecEventDto e1, SpecEventDto e2) {
			if (e1.getMonth() < e2.getMonth())
				return -1;
			else if (e1.getMonth() > e2.getMonth())
				return 1;
			else if (e1.getDay() < e2.getDay())
				return -1;
			else
				return 1;
		}
	}
}
