package com.molnart.specialevents.domain.dto;

public class PersonDto {
	private String name;
	private long id;
	
	public PersonDto(){}
	public PersonDto(long id, String name) {
		this.id = id;
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public long getId() {
		return id;
	}
}
