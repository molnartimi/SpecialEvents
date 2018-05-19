package com.molnart.specialevents.domain.dto;

public class GiftDto {
    private String name;
    private long id;
    private boolean done;

    public GiftDto(){};
    public GiftDto(String name, long id, boolean done) {
        this.name = name;
        this.id = id;
        this.done = done;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}
