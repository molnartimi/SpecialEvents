package com.molnart.specialevents.domain.person;

import com.molnart.specialevents.domain.events.SpecEventEntity;

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
	
	@ManyToMany
	@JoinTable(name = "persons_events",
			joinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"))
	private Set<SpecEventEntity> events = new HashSet<SpecEventEntity>();
	
	protected PersonEntity(){}
	public PersonEntity(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
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
}
