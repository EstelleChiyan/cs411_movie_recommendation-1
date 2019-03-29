package com.idk.rest.webservices.restfulwebservices.todo;
import java.util.Date;

public class Todo {
	private long id;
	private String username;
	private String review;
	private Date targetDate; 
	private boolean isDone;
	
	public Todo(int i, String string, String string2, Date date, boolean b) {
		// TODO Auto-generated constructor stub
		id=i;
		username=string;
		review=string2;
		targetDate=date;
		isDone=b;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	public Date getTargetDate() {
		return targetDate;
	}
	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}
	public boolean isDone() {
		return isDone;
	}
	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}
	
}
