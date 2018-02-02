package com.molnart.specialevents.domain.exceptions;

public class PersonDeletedException extends Exception {
	public static final String message = "No event remains for this person, deleted from db";
	public static final int code = 10;
	
	public PersonDeletedException() {
		super(message);
	}
}
