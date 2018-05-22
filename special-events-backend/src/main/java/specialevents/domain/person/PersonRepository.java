package specialevents.domain.person;

import org.springframework.data.repository.CrudRepository;
import specialevents.domain.events.SpecEventEntity;

public interface PersonRepository extends CrudRepository<PersonEntity, Long> {
	PersonEntity[] findAllByEvents(SpecEventEntity event);

	Iterable<PersonEntity> findAllByUserId(Long id);
	
	PersonEntity[] findAllByEvents_Id(long id);
}
