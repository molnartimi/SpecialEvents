package com.molnart.specialevents.domain.events;

import com.molnart.specialevents.domain.person.PersonEntity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "events")
public class SpecEventEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@ManyToMany(mappedBy = "events")
	private Set<PersonEntity> persons = new HashSet<PersonEntity>();
	private int month;
	private int day;
	@Column(name = "eventtype")
	private SpecEventTypeEnum eventType;
	
	protected SpecEventEntity(){}
	
	public SpecEventEntity(Set<PersonEntity> persons, int month, int day, SpecEventTypeEnum type) {
		this.persons = persons;
		this.month = month;
		this.day = day;
		this.eventType = type;
	}

	public long getId() {
		return id;
	}

	public int getMonth() {
		return month;
	}

	public int getDay() {
		return day;
	}

	public Set<PersonEntity> getPersons() {
		return persons;
	}

	public SpecEventTypeEnum getEventType() {
		return eventType;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public void setEventType(SpecEventTypeEnum eventType) {
		this.eventType = eventType;
	}
}
