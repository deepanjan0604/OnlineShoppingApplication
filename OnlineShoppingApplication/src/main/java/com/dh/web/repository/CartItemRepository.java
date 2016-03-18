package com.dh.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dh.web.model.CartItem;
import com.dh.web.model.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Integer>{


	CartItem findByProduct(Product product);
	
}





