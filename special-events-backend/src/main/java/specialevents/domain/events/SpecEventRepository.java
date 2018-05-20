package specialevents.domain.events;

import org.springframework.data.repository.CrudRepository;
import specialevents.domain.person.PersonEntity;

public interface SpecEventRepository extends CrudRepository<SpecEventEntity, Long> {
	SpecEventEntity[] findAllByPersons_Id(long id);

	SpecEventEntity[] findAllByPersons(PersonEntity person);
}
