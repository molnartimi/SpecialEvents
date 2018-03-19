package com.molnart.specialevents.domain.person;

import com.molnart.specialevents.domain.events.SpecEventEntity;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<PersonEntity, Long> {
	PersonEntity[] findAllByEvents(SpecEventEntity event);
}
