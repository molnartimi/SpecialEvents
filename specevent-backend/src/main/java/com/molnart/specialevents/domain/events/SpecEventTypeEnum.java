package com.molnart.specialevents.domain.events;

import java.util.HashMap;
import java.util.Map;

public enum SpecEventTypeEnum {
	BIRTHDAY(1), NAMEDAY(2), ANNIVERSARY(3);
	
	public final int value;
	
	private SpecEventTypeEnum(int value) {
		this.value = value;
	}
	// Mapping difficulty to difficulty id
	private static final Map<Integer, SpecEventTypeEnum> _map = new HashMap<Integer, SpecEventTypeEnum>();
	static
	{
		for (SpecEventTypeEnum type : SpecEventTypeEnum.values())
			_map.put(type.value, type);
	}

	/**
	 * Get difficulty from value
	 * @param value Value
	 * @return Difficulty
	 */
	public static SpecEventTypeEnum from(int value)
	{
		return _map.get(value);
	}
	
}
