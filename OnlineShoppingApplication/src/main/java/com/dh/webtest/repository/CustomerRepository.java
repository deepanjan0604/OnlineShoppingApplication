package com.dh.webtest.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.dh.webtest.model.  Customer;

public interface CustomerRepository extends JpaRepository<  Customer, Integer>{

	public List<Customer> customerlist= new ArrayList<Customer>();


}





