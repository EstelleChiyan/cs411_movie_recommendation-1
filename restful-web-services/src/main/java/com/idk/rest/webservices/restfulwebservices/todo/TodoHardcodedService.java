package com.idk.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class TodoHardcodedService { 
	private static List<Todo> todos = new ArrayList();
	private static int idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter,"wuwuwu","Harry Potter II", new Date(),false));
		todos.add(new Todo(++idCounter,"wuwuwu","Green Book II", new Date(),false));
		todos.add(new Todo(++idCounter,"wuwuwu","Lala Land II", new Date(),false));
	}
	
	public List<Todo> findAll(){
		return todos;
		
	}
}
 