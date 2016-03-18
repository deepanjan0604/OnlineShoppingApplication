package com.dh.web.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dh.web.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{

	List<Order> findByCustomerCustomerId(int customerId, Sort sortByOrderIdDesc);

	
}





