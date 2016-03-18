package com.dh.web.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.dh.web.model.Brand;
import com.dh.web.model.Category;
import com.dh.web.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

	

List<Product> findByCategoryCategoryId(int categoryId);

List<Product> findByBrandBrandId(int brandId);


List<Product> findByProductName(String productName);

 List<Product> findByCategoryCategoryName(String categoryName);

//@Query(value="SELECT * FROM product WHERE p.") 
//List<Product> findByBrand(List<Product> product, String brandName);

List<Product> findByCategoryAndBrandIn(Category cat ,List<Brand> brand);

@Query(value="SELECT COUNT(*) FROM Product")
public Integer findCount();



/*@Query(value="SELECT * FROM PRODUCT WHERE ")
public Page<Product> findByCategoryandBrand(PageRequest pageRequest, String CategoryName, String BrandName);
*/


@Query(value="select product.productName from Product product where product.productName LIKE :productName||'%'")
	public List<String>findByproductName(@Param("productName") String productName);



}





