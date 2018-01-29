package com.molnart.specialevents.domain.person;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "persons")
public class PersonEntity  implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String name;
	
	protected PersonEntity(){}
	public PersonEntity(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}

	public long getId() {
		return id;
	}
}
