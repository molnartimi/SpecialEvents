package specialevents.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import specialevents.domain.dto.GiftDto;
import specialevents.domain.dto.PersonDto;
import specialevents.domain.events.SpecEventEntity;
import specialevents.domain.gifts.GiftEntity;
import specialevents.domain.gifts.GiftRepository;
import specialevents.domain.person.PersonEntity;
import specialevents.domain.person.PersonRepository;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class PersonService {

	@Autowired
	private PersonRepository personRepository;
	@Autowired
	private GiftRepository giftRepository;
	
	public PersonEntity getEntity(String id) {
		return personRepository.findById(Long.parseLong(id)).get();
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
		return toDto(personRepository.findById(id).get());
	}
	
	@Transactional
	public void addEvent(Set<PersonEntity> persons, SpecEventEntity eventEntity) {
		for (PersonEntity p: persons) {
			personRepository.findById(p.getId()).get().addEvent(eventEntity);
		}
	}
	
	@Transactional
	public void edit(PersonDto person) {
		PersonEntity entity = personRepository.findById(person.getId()).get();
		if (entity != null) {
			entity.setName(person.getName());
		}
	}
	
	public Set<SpecEventEntity> delete(String id) {
		PersonEntity person = personRepository.findById(Long.parseLong(id)).get();
		personRepository.delete(person);
		return person.getEvents();
	}

	public PersonEntity deleteEventFromPerson(SpecEventEntity event, String personId) {
		PersonEntity person = personRepository.findById(Long.parseLong(personId)).get();
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
		return personRepository.findById(person.getId()).get();
	}
	
	public Set<PersonEntity> toEntity(Set<PersonDto> persons) {
		Set<PersonEntity> result = new HashSet<PersonEntity>();
		for (PersonDto p: persons) {
			result.add(personRepository.findById(p.getId()).get());
		}
		return result;
	}

	@Transactional
	public void editEvent(Set<PersonEntity> persons, SpecEventEntity event) {
		List<PersonEntity> personEntities = Arrays.asList(personRepository.findAllByEvents(event));
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

	public Set<GiftDto> getGifts(long personId) {
		return toDto(personRepository.findById(personId).get().getGifts());
	}

	@Transactional
	public void saveGifts(GiftDto[] gifts, long personId) {
		PersonEntity person = personRepository.findById(personId).get();
		Set<GiftEntity> entities = new HashSet<GiftEntity>();
		for (GiftEntity gift: person.getGifts()) {
			if (!entities.contains(gift)) {
				person.getGifts().remove(gift);
				giftRepository.delete(gift);
			}
		}
		for (GiftDto gift: gifts) {
			GiftEntity entity = giftRepository.findById(gift.getId()).get();
			if (entity == null) {
				entity = new GiftEntity(gift.getId(), gift.getName(), gift.isDone());
				person.getGifts().add(entity);
				giftRepository.save(entity);
			} else {
				entity.setName(gift.getName());
				entity.setDone(gift.isDone());
			}
		}
	}

	private Set<GiftDto> toDto(Set<GiftEntity> gifts) {
		Set<GiftDto> dtos = new HashSet<GiftDto>();
		for (GiftEntity gift: gifts) {
			dtos.add(new GiftDto(gift.getName(), gift.getId(), gift.isDone()));
		}
		return dtos;
	}
}
