package com.dh.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dh.web.model.Customer;
import com.dh.web.model.ShippingAddress;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Integer>{

	List<ShippingAddress> findByCustomer(Customer customer);


}





