package com.molnart.specialevents.domain.dto;

public class PersonDto {
	private String name;
	
	public PersonDto(){}
	public PersonDto(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
