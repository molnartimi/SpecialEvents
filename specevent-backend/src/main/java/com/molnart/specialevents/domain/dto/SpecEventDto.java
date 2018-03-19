package com.molnart.specialevents.domain.dto;

import java.util.HashSet;
import java.util.Set;

public class SpecEventDto {
	protected long id;
	protected Set<PersonDto> persons = new HashSet<PersonDto>();
	protected int month;
	protected int day;
	protected String eventType;
	
	public SpecEventDto() {}
	public SpecEventDto(long id, Set<PersonDto> p, int m, int d, String t) {
		this.id = id;
		persons = p;
		month = m;
		day = d;
		eventType = t;
	}

	public long getId() {
		return id;
	}

	public Set<PersonDto> getPersons() {
		return persons;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
}
