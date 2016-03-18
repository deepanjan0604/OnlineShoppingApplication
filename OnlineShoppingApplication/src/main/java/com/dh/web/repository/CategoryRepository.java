package com.dh.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dh.web.model.Category;

public interface CategoryRepository extends JpaRepository< Category, String>{

	Category findByCategoryName(String CategoryName);

}





