package com.molnart.specialevents.domain.events;

import com.molnart.specialevents.domain.person.PersonEntity;
import org.springframework.data.repository.CrudRepository;

public interface SpecEventRepository extends CrudRepository<SpecEventEntity, Long> {
	SpecEventEntity[] findAllByPerson(PersonEntity person);
}
