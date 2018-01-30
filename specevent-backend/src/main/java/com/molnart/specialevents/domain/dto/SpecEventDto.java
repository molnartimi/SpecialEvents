package com.molnart.specialevents.domain.dto;

import com.molnart.specialevents.domain.events.SpecEventTypeEnum;

public class SpecEventDto {
	protected long id;
	protected String name;
	protected int month;
	protected int day;
	protected int eventType;
	
	public SpecEventDto() {}
	public SpecEventDto(long id, String p, int m, int d, int t) {
		this.id = id;
		name = p;
		month = m;
		day = d;
		eventType = t;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
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

	public int getEventType() {
		return eventType;
	}

	public void setEventType(int eventType) {
		this.eventType = eventType;
	}
}
