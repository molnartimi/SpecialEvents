package com.molnart.specialevents.domain.person;

import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<PersonEntity, Long> {
	PersonEntity findOneByName(String name);
}
