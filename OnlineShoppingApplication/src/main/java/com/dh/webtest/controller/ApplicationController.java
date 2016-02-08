package com.dh.webtest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.dh.webtest.repositories.CustomerRepository;
import com.dh.webtest.repositories.CustomerRepository;

@RestController
public class ApplicationController {
	
	@Autowired
	CustomerRepository customerRepository;

}
