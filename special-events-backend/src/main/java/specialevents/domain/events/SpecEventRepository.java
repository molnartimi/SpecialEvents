package specialevents.domain.events;

import org.springframework.data.repository.CrudRepository;
import specialevents.domain.person.PersonEntity;

import java.util.ArrayList;

public interface SpecEventRepository extends CrudRepository<SpecEventEntity, Long> {
	SpecEventEntity[] findAllByPersons_Id(long id);

	Iterable<SpecEventEntity> findAllByPersons(PersonEntity person);
}
