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

	public int getDay() {
		return day;
	}

	public String getEventType() {
		return eventType;
	}
}
