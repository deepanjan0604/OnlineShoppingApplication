package com.dh.webtest.controller;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.dh.webtest.controller.ProductDAO;
import com.dh.webtest.model.Authority;
import com.dh.webtest.model.Brand;
import com.dh.webtest.model.Cart;
import com.dh.webtest.model.CartItem;
import com.dh.webtest.model.Category;
import com.dh.webtest.model.Customer;
import com.dh.webtest.model.Order;
import com.dh.webtest.model.OrderDetail;
import com.dh.webtest.model.Product;
import com.dh.webtest.model.ShippingAddress;
import com.dh.webtest.model.StateVat;
import com.dh.webtest.model.User;
import com.dh.webtest.repository.AuthorityRepository;
import com.dh.webtest.repository.BrandRepository;
import com.dh.webtest.repository.CartRepository;
import com.dh.webtest.repository.CartItemRepository;
import com.dh.webtest.repository.CategoryRepository;
import com.dh.webtest.repository.CustomerRepository;
import com.dh.webtest.repository.OrderRepository;
import com.dh.webtest.repository.OrderDetailRepository;
import com.dh.webtest.repository.ProductRepository;
import com.dh.webtest.repository.ShippingAddressRepository;
import com.dh.webtest.repository.StateVatRepository;
import com.dh.webtest.repository.UserRepository;


@RestController
public class ApplicationController {

	@Autowired
	UserRepository userRepository;
	@Autowired
	AuthorityRepository authorityRepository;
	@Autowired
	BrandRepository brandRepository;
	@Autowired
	CartItemRepository cartItemRepository ;
	
	@Autowired
	CartRepository cartRepository ;
	
	@Autowired
	CustomerRepository customerRepository ;
	@Autowired
	OrderRepository orderRepository ;
	
	@Autowired
	OrderDetailRepository orderDetailRepository ;
	
	@Autowired
	ShippingAddressRepository shippingAddresRepository ;
	
	@Autowired
	ProductRepository productRepository ;
	
	@Autowired
	StateVatRepository stateVatRepository ;

	
	@RequestMapping("/brands")
	public List<Brand> getBrands() {
		return (List<Brand>) brandRepository.findAll();
	}	

	

	@RequestMapping("/cart")
	public List<Cart> getCart() {
		return (List<Cart>) cartRepository.findAll();
	}	
	

	
	@RequestMapping("/cartitems")
	public List<CartItem> getCartItem() {
		return (List<CartItem>) cartItemRepository.findAll();
	}
	
	
	@RequestMapping("/customers")
	public List<Customer> getCustomers() {
		return (List<Customer>) customerRepository.findAll();
	}	
	
	
	@RequestMapping("/orders")
	public List<Order> getOrder() {
		return (List<Order>) orderRepository.findAll();
	}	
	
	
	@RequestMapping("/orderdetails")
	public List<OrderDetail> getOrderDetail() {
		return (List<OrderDetail>) orderDetailRepository.findAll();
	}

	@RequestMapping("/products")
	public List<Product> getProducts() {
		return (List<Product>) productRepository.findAll();
	}	

	/*@RequestMapping("/shippingaddresses")
	public List<ShippingAddress> getShippingAddress() {
		
		return List<ShippingAddress> shippingaddressRepository.findAll();
	}
	*/
	
	
	@RequestMapping("/users")
	public List<User> getUsers() {
		return (List<User>) userRepository.findAll();
	}	
	
	@RequestMapping("/savecustomer")
	public HashMap<String, Object> savecustomer(@RequestBody Customer customer) {
		HashMap<String, Object> returnParams = new HashMap<String, Object>();
		
		try {
			customerRepository.save(customer);
			returnParams.put("status", true);
		} catch (Exception e) {
			returnParams.put("status", false);
			returnParams.put("msg", "customer Addition Failed!!!!!!");
		

		
	}
		return returnParams;
	

	}
	@Autowired
    ProductDAO productDAO;
     
	
	@RequestMapping("/product")
    public String index(Map<String, Object> map) {
        try {
            map.put("product", new Product());
            map.put("productList", productDAO.list());
        }catch(Exception e) {
            e.printStackTrace();
        }
 
        return "products";
    }
	
	@RequestMapping(value="/image/:id", produces="image/png")
	public String getImage(){
		return null;
		
	}
	
}


	