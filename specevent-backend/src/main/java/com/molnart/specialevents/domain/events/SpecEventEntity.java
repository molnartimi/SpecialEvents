package com.molnart.specialevents.domain.events;

import com.molnart.specialevents.domain.person.PersonEntity;

import javax.persistence.*;

@Entity
@Table(name = "events")
public class SpecEventEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@ManyToOne
	private PersonEntity person;
	private int month;
	private int day;
	@Column(name = "eventtype")
	private SpecEventTypeEnum eventType;
	
	protected SpecEventEntity(){}
	
	public SpecEventEntity(PersonEntity person, int month, int day, SpecEventTypeEnum type) {
		this.person = person;
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

	public PersonEntity getPerson() {
		return person;
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
