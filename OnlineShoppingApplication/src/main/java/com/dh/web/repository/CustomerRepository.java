package com.dh.web.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dh.web.model.Customer;

public interface CustomerRepository extends JpaRepository<  Customer, Integer>{

	public List<Customer> customerlist= new ArrayList<Customer>();

	Customer findByuserName(String userName);


Customer findByOrderOrderId(int orderId);
Customer findByUserNameAndEmailId(String userName, String emailId);
	List<Customer> findByFirstName(String firstName);
	
	@Query(value="select c.userName from Customer c where c.userName LIKE :username || '%'")
	public List<String>findbyusername(@Param("username")String username);
}





