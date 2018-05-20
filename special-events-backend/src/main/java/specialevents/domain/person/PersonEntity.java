package specialevents.domain.person;

import specialevents.domain.events.SpecEventEntity;
import specialevents.domain.gifts.GiftEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "persons")
public class PersonEntity  implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String name;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "persons_events",
			joinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"))
	private Set<SpecEventEntity> events = new HashSet<SpecEventEntity>();

	@OneToMany(fetch = FetchType.EAGER)
	private Set<GiftEntity> gifts;
	
	protected PersonEntity(){}
	public PersonEntity(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public long getId() {
		return id;
	}
	
	public void addEvent(SpecEventEntity event) { 
		events.add(event); 
	}
	
	public Set<SpecEventEntity> getEvents() {
		return events;
	}

	public void setGifts(Set<GiftEntity> gifts) {
		this.gifts = gifts;
	}

	public Set<GiftEntity> getGifts() {
		return gifts;
	}
}
