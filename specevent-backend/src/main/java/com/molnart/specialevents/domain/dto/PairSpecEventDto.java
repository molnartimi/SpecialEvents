package com.molnart.specialevents.domain.dto;

import com.molnart.specialevents.domain.events.SpecEventTypeEnum;

public class PairSpecEventDto extends SpecEventDto {
	private String name2;

	public PairSpecEventDto(long id, String p, String p2, int m, int d, SpecEventTypeEnum t) {
		super(id,p,m,d,t);
		name2 = p2;
	}
}
