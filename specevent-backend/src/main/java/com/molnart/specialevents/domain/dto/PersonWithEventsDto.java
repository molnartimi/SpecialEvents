package com.molnart.specialevents.domain.dto;

import java.util.List;

public class PersonWithEventsDto extends PersonDto {
	private List<SpecEventDto> events;
	
	public PersonWithEventsDto(long id, String name, List<SpecEventDto> events) {
		super(id, name);
		this.events = events;
	}

	public List<SpecEventDto> getEvents() {
		return events;
	}
}
