package com.molnart.specialevents.domain.events;

public enum SpecEventTypeEnum {
	BIRTHDAY("BIRTH"), NAMEDAY("NAME"), ANNIVERSARY("ANNY");
	
	public final String value;
	
	private SpecEventTypeEnum(String value) {
		this.value = value;
	}
	
}
