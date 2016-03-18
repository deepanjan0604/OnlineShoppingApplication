package com.dh.web.controller;



import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Random;

import javax.xml.bind.JAXBException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.security.access.method.P;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import com.dh.web.model.Brand;
import com.dh.web.model.Cart;
import com.dh.web.model.CartItem;
import com.dh.web.model.Category;
import com.dh.web.model.Customer;
import com.dh.web.model.Order;
import com.dh.web.model.OrderDetail;
import com.dh.web.model.Product;
import com.dh.web.model.ProductImage;
import com.dh.web.model.ShippingAddress;
import com.dh.web.model.StateVat;
import com.dh.web.repository.BrandRepository;
import com.dh.web.repository.CartItemRepository;
import com.dh.web.repository.CartRepository;
import com.dh.web.repository.CategoryRepository;
import com.dh.web.repository.CustomerRepository;
import com.dh.web.repository.OrderDetailRepository;
import com.dh.web.repository.OrderRepository;
import com.dh.web.repository.ProductImageRepository;
import com.dh.web.repository.ProductRepository;
import com.dh.web.repository.ShippingAddressRepository;
import com.dh.web.repository.StateVatRepository;



@RestController
public class ApplicationController {

	




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
ShippingAddressRepository shippingAddressRepository ;

@Autowired
ShippingAddressRepository shippingAddressRepository2;

@Autowired
ProductRepository productRepository ;

@Autowired
StateVatRepository stateVatRepository ;

@Autowired
CategoryRepository categoryRepository ;

@Autowired
ProductImageRepository productImageRepository;


@RequestMapping("/public/log")
public HashMap<String, String> getLogin() {
HashMap<String, String> returnParams = new HashMap<String, String>();

//System.out.println(SecurityContextHolder.getContext().getAuthentication().getName());
//    System.out.println(SecurityContextHolder.getContext().getAuthentication().getCredentials());
//    System.out.println(SecurityContextHolder.getContext().getAuthentication().getDetails());
//System.out.println(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
//    System.out.println(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
//System.out.println(SecurityContextHolder.getContext().getAuthentication());
if(!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken) && SecurityContextHolder.getContext().getAuthentication().isAuthenticated()==true)
{
  returnParams.put("status", "true"); 
  returnParams.put("name", SecurityContextHolder.getContext().getAuthentication().getName());
  Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
  Boolean authority = authorities.contains(new SimpleGrantedAuthority("USER"));
  Boolean auth = true;
  //System.out.println(authority);
  if(authority==auth)
    returnParams.put("role", "user");
  else
    returnParams.put("role", "admin");
}
else
{
  returnParams.put("status", "false");  
}
return returnParams;
}



@RequestMapping("/public/brands")
public List<Brand> getBrands() {
  return (List<Brand>) brandRepository.findAll();
} 


@RequestMapping("/user/cart")

public Cart getCart() {
	
	Customer customer = getCustomer();
	try
	{
	int cartid = customer.getCart().getCartId();
	return cartRepository.findOne(cartid);
	} catch (Exception e) {
		return null;
	}

	}



@RequestMapping("/user/cart/{cartId}")
public Cart  getCart (@PathVariable("cartId") int cartId){

return  cartRepository.findOne(cartId);
}

@RequestMapping("/user/cartitems")
public List<CartItem> getCartItem() {
  return (List<CartItem>) cartItemRepository.findAll();
}


@RequestMapping("/user/customers")
public List<Customer> getCustomers() {
  
  return (List<Customer>) customerRepository.findAll();
} 

@RequestMapping("/user/customers/one")
public Customer  getCustomer (){
  String userName = SecurityContextHolder.getContext().getAuthentication().getName();
  return  customerRepository.findByuserName(userName);
}


@RequestMapping("/admin/orders")
public Page<Order> getOrders(@RequestParam("pc")int pc, @RequestParam("ps")int ps) {

	int pageCount;
	if(pc==0){
		pageCount=0;
	}
	else{
		pageCount=pc-1;
	}
	
	PageRequest pageRequest=new PageRequest(pageCount,ps);
	

return (Page<Order>) orderRepository.findAll(pageRequest);
}


@RequestMapping("/admin/orders/{orderId}")
public Customer getOrder1(@PathVariable("orderId")int orderId) {
return  customerRepository.findByOrderOrderId(orderId);
	}

@RequestMapping("/autosearchbyname/{userName}")
public  List<String>  getOrdersByName(@PathVariable("userName") String userName){
return customerRepository.findbyusername("%"+userName+"%");
} 

@RequestMapping("/admin/ordercost/{orderId}")
public Order getOrder2(@PathVariable("orderId")int orderId) {
return  orderRepository.findOne(orderId);
	}


@RequestMapping("/admin/orders/search/{userName}")
public List<Order> getCustomerbyfirstName(@PathVariable("userName") String userName) {
  //HashMap<String, Object> returnParams=new HashMap<String, Object>();
	return customerRepository.findByuserName(userName).getOrder();
/*return   (List<Customer>) customerRepository.findByFirstName(firstName);
*/
} 


@RequestMapping("/user/myorders")
public List<Order> getmyOrders() {
	List<Order> order = getCustomer().getOrder();
	Customer customer=new Customer();
  customer.getCustomerId();
  int customerId=getCustomer().getCustomerId();
return (List<Order>) orderRepository.findByCustomerCustomerId(customerId, sortByOrderIdDesc());
} 

private Sort sortByOrderIdDesc() {
    return new Sort(Sort.Direction.DESC, "orderId");
}

@RequestMapping("/admin/order/{orderId}")
public List<OrderDetail> getOrderDetail(@PathVariable("orderId") int orderId) {
	Order order = orderRepository.findOne(orderId);
	
  return order.getOrderdetail();
}

@RequestMapping("/user/order/{orderId}")
public List<OrderDetail> getOrderDetail1(@PathVariable("orderId") int orderId) {
	Order order = orderRepository.findOne(orderId);
	
  return order.getOrderdetail();
}



/*@RequestMapping("/public/productsearch")
public List<Product> getProducts() {
  return (List<Product>) productRepository.findAll();
}
*/


@RequestMapping("/public/products")
public Page<Product> getProducts(@RequestParam("pc")int pc, @RequestParam("ps")int ps) {

	int pageCount;
	if(pc==0){
		pageCount=0;
	}
	else{
		pageCount=pc-1;
	}
	
	PageRequest pageRequest=new PageRequest(pageCount,ps);
return (Page<Product>) productRepository.findAll(pageRequest);
}

@RequestMapping("/public/productsearch")
public List<Product> getProduct(@RequestBody HashMap<String , Object> map ) {
	List<Product> p2=null;
	
	Category cat = categoryRepository.findOne((String) map.get("category"));
	
	List<Object> list  =  (List<Object>) map.get("brand");
	ListIterator<Object> listIterator = list.listIterator();
	List<Brand> bList = new ArrayList<>();

	while (listIterator.hasNext()) {
		String name = (String) listIterator.next();
		Brand brand = brandRepository.findOne(name);
		bList.add(brand);
		
	}
	
	
	
	List<Product> pList = productRepository.findByCategoryAndBrandIn(cat,bList);
	System.out.println(pList.size());
	
	return pList;
/*	PageRequest pageRequest=new PageRequest(pageCount,pageSize);
	System.out.println(productRepository.count());
return (Page<Product>) productRepository.findAll(pageRequest);*/
}

/*@RequestMapping("/public/productsearch")
public List<Product> getProduct(@RequestBody HashMap<String , Object> map ) {
	List<Product> p2=null;
	String category= (String) map.get("category");
	String [] brand=(String[]) map.get("brand");
	Product p1=(Product) productRepository.findByCategory(category);
	for(int i=0; i<brand.length;i++){
	 p2= productRepository.findByBrand(p1, brand[i]);
	}
	return p2;
}
*/

@RequestMapping("/public/products/brand/{brandId}")
public List<Product> getProductByBrand(@PathVariable("brandId") int brandId) {
return (List<Product>) productRepository.findByBrandBrandId(brandId);
}


@RequestMapping("/public/products/category/{categoryId}")
public List<Product> getProductByCategory(@PathVariable("categoryId") int categoryId) {
return (List<Product>) productRepository.findByCategoryCategoryId(categoryId);
}




@RequestMapping("public/product/{productId}")
public Product  getProduct(@PathVariable("productId") int productId){
  return  productRepository.findOne(productId);
}


@RequestMapping("/public/products/{productName}")
public List<Product>  getProductbyName (@PathVariable("productName") String productName){
  return  productRepository.findByProductName(productName);
}



/*@RequestMapping("/public/products/{productName}")
public List<Product>  getProductbyName (@PathVariable("productName") String productName){
return  productRepository.findByProductName(productName);
}
*/


@RequestMapping("/autosearchbytitle/{productName}")
public  List<String>  getProductbyName1(@PathVariable("productName") String productName){
return productRepository.findByproductName("%"+productName+"%");
}  




@RequestMapping("/public/viewproducts")
public List<Product> getviewProducts() {
  return (List<Product>) productRepository.findAll();
} 




@RequestMapping("/public/categories")
public List<Category> getCategories() {
  return (List<Category>) categoryRepository.findAll();
} 



@RequestMapping("/user/shippingaddress/{shippingId}")
public ShippingAddress getShippingAddress(@PathVariable("shippingId") int shippingId) {
  return  shippingAddressRepository2.findOne(shippingId);
}


@RequestMapping("/user/shippingaddresses")
public List<ShippingAddress> getShippingAddress() {
  return (List<ShippingAddress>) shippingAddressRepository.findAll();
}




@RequestMapping("/user/shippingaddresses/one")
public List<ShippingAddress> getShippingAddressOne() {
  String userName = SecurityContextHolder.getContext().getAuthentication().getName();
  Customer customer=  customerRepository.findByuserName(userName);
  int id=customer.getCustomerId();
  System.out.println("---------------->Customer object is :"+customer);
  return (List<ShippingAddress>) shippingAddressRepository.findByCustomer(customer);
}



@RequestMapping("/user/displaystate")
public List<StateVat> getStateVat() {
  return (List<StateVat>) stateVatRepository.findAll();
} 



@RequestMapping("/public/savecustomer")
public HashMap<String, Object> savecustomer(@RequestBody Customer customer) {
  HashMap<String, Object> returnParams = new HashMap<String, Object>(); 
  try {
   
    String userName=customer.getUserName();
    String emailId=customer.getEmailId();
    Customer customer1=customerRepository.findByuserName(userName);
    if(customer1 != null){
    returnParams.put("msg1", "Username/EmailId exists");
    }
    else{
    	 customerRepository.save(customer);
    	    returnParams.put("status", true);
    }
    	
  } catch (Exception e) {
    returnParams.put("status", false);
    returnParams.put("msg", "customer Addition Failed User Exists!!!!!!");   
  }
  return returnParams;  
}




@RequestMapping("/admin/addcategory")
public HashMap<String, Object> category(@RequestBody Category category) {
  HashMap<String, Object> returnParams = new HashMap<String, Object>();
  

try {
	  String CategoryName= category.getCategoryName();
	  Category cat=categoryRepository.findByCategoryName(CategoryName);
	  if(cat!=null)
	  {
		  returnParams.put("msg1", "Category exists");
	  }
	  else{
    categoryRepository.save(category);
    returnParams.put("status", true);
  } 
  }
  catch (Exception e) {
    returnParams.put("status", false);
  }
  return returnParams;  
}



@RequestMapping("/admin/addbrand")
public HashMap<String, Object> category(@RequestBody Brand brand) {
  HashMap<String, Object> returnParams = new HashMap<String, Object>(); 
try {
	  
	  
	  String BrandName= brand.getBrandName();
	  Brand bran=brandRepository.findByBrandName(BrandName);
			  
	  if(bran!=null)
	  {
		  returnParams.put("msg1", "Brand exists");
	  }
	  else{
   brandRepository.save(brand);
    returnParams.put("status", true);
  } 
	  }
  catch (Exception e) {
    returnParams.put("status", false);
      
  }
  return returnParams;  

}






@RequestMapping("/user/addshippingaddress")
public HashMap<String, Object> addShippingaddress(@RequestBody ShippingAddress shippingaddress) {
  HashMap<String, Object> returnParams = new HashMap<String, Object>();
  try{
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    Customer customer=  customerRepository.findByuserName(userName);
    System.out.println("Customer Object:"+customer);
    int id=customer.getCustomerId();
    System.out.println("-----------------------> Customer Id:"+id);  
    shippingaddress.setCustomer(customer);
    String state=shippingaddress.getState();
    System.out.println("------------------->State is:"+state);
    StateVat stateVat=(StateVat) stateVatRepository.findBystate(state);
    int stateId=stateVat.getStateId();
    System.out.println("------------------------> State Id :"+stateId);
    shippingaddress.setStateVat(stateVat);
    System.out.println(customer);    
    shippingAddressRepository2.save(shippingaddress);
    returnParams.put("status", true);
  } catch (Exception e) {
    returnParams.put("status", false);
    returnParams.put("msg", "Shippingaddress Addition Failed!!!!!!");    
  }
  return returnParams;  
}



@RequestMapping("/user/editshippingaddress")
public HashMap<String, Object> editShippingaddress(@RequestBody ShippingAddress shippingaddress) {
  HashMap<String, Object> returnParams = new HashMap<String, Object>();
  try{

    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    Customer customer=  customerRepository.findByuserName(userName);
    System.out.println("Customer Object:"+customer);
    int id=customer.getCustomerId();
    System.out.println("-----------------------> Customer Id:"+id);
    
    shippingaddress.setCustomer(customer);
    String state=shippingaddress.getState();
    System.out.println("------------------->State is:"+state);
    StateVat stateVat=(StateVat) stateVatRepository.findBystate(state);
    int stateId=stateVat.getStateId();
    System.out.println("------------------------> State Id :"+stateId);
    shippingaddress.setStateVat(stateVat);
    System.out.println(customer);

    
      /*String userName = SecurityContextHolder.getContext().getAuthentication().getName();
      Customer customer=  customerRepository.findByuserName(userName);*/
      
        /*int id=customer.getCustomerId();
  */
        
        shippingaddress.setCustomer(customer);
      /*String state=shippingaddress.getState();
      
      StateVat stateVat=(StateVat) stateVatRepository.findBystate(state);
      int stateId=stateVat.getStateId();*/
      
      shippingaddress.setStateVat(stateVat);
      shippingAddressRepository2.save(shippingaddress);
      returnParams.put("status", true);
    } catch (Exception e) {
      returnParams.put("status", false);
      returnParams.put("msg", "Shippingaddress Addition Failed!!!!!!");
    }
    return returnParams;  
  }
  



  @RequestMapping("/admin/saveproduct")
  public HashMap<String, Object> saveproduct(@RequestBody Product product) throws IOException {
    HashMap<String, Object> returnParams = new HashMap<String, Object>();
    
    try {
//    	byte[] b = file.getBytes();
//    	String imageFile = StringUtils.newStringUtf8(Base64.encodeBase64(b));
//    	System.out.println(imageFile);
     // System.out.println(product.getCategory());
      productRepository.save(product);
      ProductImage productImage=new ProductImage();
      productImage.setProduct(product);
      productImage.setImage(product.getImage());
      productImageRepository.save(productImage);
      returnParams.put("status", true);
    } catch (Exception e) {
      returnParams.put("status", false);
      returnParams.put("msg", "product Addition Failed!!!!!!");   
    }
    return returnParams;  
  }
  
  
  
  @RequestMapping("/user/savedetails")
  public HashMap<String, Object> savedetails(@RequestBody Customer customer) {
    HashMap<String, Object> returnParams = new HashMap<String, Object>();
    
    try {
      customerRepository.save(customer);
      returnParams.put("status", true);
    } catch (Exception e) {
      e.printStackTrace();
      returnParams.put("status", false);
      returnParams.put("msg", "Details Addition Failed!!!!!!"); 
    }
    return returnParams;
  }
  
  


/* @RequestMapping("/addtocart")		  
public HashMap<String, Object> addtoCart(@RequestBody CartItem cartitem) {		}
	HashMap<String, Object> returnParams = new HashMap<String, Object>();		
try		
{		
	Customer customer= getCustomer();		
	Cart cartcheck = customer.getCart();		
	if(cartcheck != null)		
	{		
int cartid = customer.getCart().getCartId();		
Cart cart = cartRepository.findOne(cartid);		
 	cartitem.setCart(cart);		
 			
	}		
	List<CartItem> cartitems = cart.getCartitem();		
	Iterator<CartItem> it = cartitems.iterator();		
	while(it.hasNext()){		
		CartItem cartitem= (CartItem)it.next();		
		Product product = cartitem.getProduct();		
		product.setCartitem(cartitem);		
		cartitem.setCart(cart);		
	}		
		else		
		{		
			Cart cart1 = customer.getCart();		
			cartitem.setCart(cart1);		
}		
			
			
//	cart.setCustomer(getCustomer());		
	cartItemRepository.save(cartitem);		
	returnParams.put("status", true);		
} catch (Exception e) {		
	e.printStackTrace();		
		returnParams.put("status", false);		
		returnParams.put("msg", "Cart Addition Failed!");		
			
			
}		
return returnParams;		
}		
}		
*/
/*  
  @RequestMapping(value = "/upload")
  public HashMap<String, Object> handleFormUpload(@RequestParam("file") MultipartFile file) throws IOException{
    File convertedFile=convert(file);
System.out.println(convertedFile);
Product prodcut=new Product();
//int id=product.getProductId();
HashMap<String, Object> returnParams = new HashMap<String, Object>();
byte[] b = file.getBytes();
String imageFile = StringUtils.newStringUtf8(Base64.encodeBase64(b));
System.out.println(imageFile);

Product uploadFile = new Product();
uploadFile.setImage(imageFile);
uploadFile.setExtn("jpg");
//uploadFile.setProduct(product);
productRepository.save(uploadFile);
System.out.println("Image Successfully Manipulated!");
return returnParams;
}
}*/





@RequestMapping("/user/cartcheck")		
public HashMap<String, String> cartCheck() {		
HashMap<String, String> returnParams = new HashMap<String, String>();		
Customer customer= getCustomer();		
	Cart cartcheck = customer.getCart();		
	if(cartcheck != null)		
		returnParams.put("status", "true");		
else		
  returnParams.put("status", "false");  		
return returnParams;		
}		
		
		
		
@RequestMapping("/user/addcartitem")		
public HashMap<String, Object> addCartitem(@RequestBody CartItem cartitem) {		
	HashMap<String, Object> returnParams = new HashMap<String, Object>();		
try		
{	
	int qty = cartitem.getQuantity();
	int productQty=cartitem.getProduct().getQuantity();
	System.out.println(productQty+":"+qty);
	Product product=cartitem.getProduct();
	Cart cart = getCustomer().getCart();
	int productId = product.getProductId();
	if(qty>productQty){
		System.out.println("Quantity exceeded");
		 returnParams.put("msg", "quantity exceeded");
	}
	
	
	if(qty<productQty)
	{	
		
		List<CartItem> cartitems = cart.getCartitem();
		Iterator<CartItem> it = cartitems.iterator();
		boolean stat;
		while(it.hasNext()){		
			CartItem cartit= (CartItem)it.next();	
			 stat = cartit.getProduct().getProductId()==productId;
			if(stat==true)
			{
			cartitem.setQuantity(cartit.getQuantity()+1);
			cartitem.setCartitemId(cartit.getCartitemId());
			}
			}
	
		cartitem.setCart(cart);		
		
				
	cartItemRepository.save(cartitem);		
	returnParams.put("status", true);
		
	}


} catch (Exception e) {		
	e.printStackTrace();		
		returnParams.put("status", false);		
		returnParams.put("msg", "Cart Addition Failed!");		
			
			
}		
return returnParams;		
}		
		
@RequestMapping("/user/addcartitemquantity")		
public HashMap<String, Object> addCartitemQuantity(@RequestBody CartItem cartitem) {		
	HashMap<String, Object> returnParams = new HashMap<String, Object>();		
try		
{	
	int qty = cartitem.getQuantity();
	int productQty=cartitem.getProduct().getQuantity();
	System.out.println(productQty+":"+qty);
	
	if(qty>productQty){
		System.out.println("Quantity exceeded");
		 returnParams.put("msg", "quantity exceeded");
	}

	else
	{	
		/*Product product=cartitem.getProduct();
		CartItem productexist=cartItemRepository.findByProduct(product);
		
		if(productexist!=null){
			productexist.setQuantity(qty+1);
		}*/
		
	Customer customer= getCustomer();		
	Cart cartcheck = customer.getCart();		
	if(cartcheck != null)		
	{		
		int cartid = customer.getCart().getCartId();		
		Cart cart = cartRepository.findOne(cartid);		
		cartitem.setCart(cart);		
	}		
				
	cartItemRepository.save(cartitem);		
	returnParams.put("status", true);
		
	}
	
} catch (Exception e) {		
	e.printStackTrace();		
		returnParams.put("status", false);		
		returnParams.put("msg", "Cart Addition Failed!");		
			
			
}		
return returnParams;		
}		
		




@RequestMapping("/user/addcart")		
public HashMap<String, Object> addCart(@RequestBody Cart cart) {		
	HashMap<String, Object> returnParams = new HashMap<String, Object>();		
try		
{			
	List<CartItem> cartitems = cart.getCartitem();		
	Iterator<CartItem> it = cartitems.iterator();		
	while(it.hasNext()){		
		CartItem cartitem= (CartItem)it.next();		
		/*Product product = cartitem.getProduct();		
		product.setCartitem(cartitem);*/		
		cartitem.setCart(cart);		
	}		
				
cart.setCustomer(getCustomer());		
	cartRepository.save(cart);		
	returnParams.put("status", true);		
} catch (Exception e) {		
	e.printStackTrace();		
		returnParams.put("status", false);		
		returnParams.put("msg", "Cart Addition Failed!");			
}				
return returnParams;		
}		






@RequestMapping("/user/calculatevat")		
public HashMap<String, Double> setShipping(@RequestBody ShippingAddress shippingaddress) {		
	HashMap<String, Double> returnParams = new HashMap<String, Double>();		

	Cart cart = getCustomer().getCart();
	
	cart.setShippingaddress(shippingaddress);
	cartRepository.save(cart);
	
	returnParams= calculateVat();
	return returnParams;		
			
}		

@RequestMapping("/user/getvat")		
public HashMap<String, Double> calculateVat() {	
	HashMap<String, Double> returnParams = new HashMap<String, Double>();		
if(getCustomer().getCart()!=null)
{
	Cart cart = getCustomer().getCart();

	if(cart.getShippingaddress()==null)
	{
		returnParams.put("status", 0.0);
		
	}
	
	if(cart.getShippingaddress()!=null)
	{
	ShippingAddress shippingaddress = cart.getShippingaddress();
	
	float total=cart.getTotalcost();		
	String state = shippingaddress.getState();		
StateVat statevat= stateVatRepository.findBystate(state);  		
StateVat country = stateVatRepository.findBystate("india");		
	double cst = (country.getVatPercent()*total)/100;		
	double vat= (statevat.getVatPercent()*total)/100;		
	double finalprice = total+cst+vat;		
	returnParams.put("cst", cst);		
	returnParams.put("vat", vat);		
	returnParams.put("finalprice", finalprice);	
	}
}
	return returnParams;	
	
}

@RequestMapping("/user/placetheorder")		
public Object placeOrder() {
	HashMap<String, Object> returnStatus = new HashMap<String, Object>();		

	
	try
	{
		Order order = new Order();
	 Cart cart = getCustomer().getCart();
	List<CartItem> cartitems = cart.getCartitem();
	Iterator<CartItem> it = cartitems.iterator();		
	while(it.hasNext()){		
		CartItem cartitem= (CartItem)it.next();		
		Product product = cartitem.getProduct();
		int productid = product.getProductId();
		String productname = product.getProductName();
		int quantity = cartitem.getQuantity();
	int productquantity = product.getQuantity();
	
	int updatedquantity = productquantity-quantity;
	if(updatedquantity==0){
		System.out.println("Product cannot be purchased");
		returnStatus.put("msg","Sorry!! Product Out of Stock");
		break;
	}
	
	product.setQuantity(updatedquantity);
	productRepository.save(product);
		float initialprice = cartitem.getInitialprice();
		OrderDetail orderdetail = new OrderDetail();
		orderdetail.setProductId(productid);
		orderdetail.setProductName(productname);
		orderdetail.setQuantity(quantity);
		orderdetail.setPrice(initialprice);
		orderRepository.save(order);
		
		orderdetail.setOrder(order);
	/*	ProductImage productImage=(ProductImage) cartitem.getProduct().getProductimage();
		orderdetail.setProductImage(productImage);*/
		orderDetailRepository.save(orderdetail);

	}		
	HashMap<String, Double> returnParams = calculateVat();
	order.setShippingAddress(cart.getShippingaddress());
	order.setCustomer(getCustomer());
	float totalcost = cart.getTotalcost();
	order.setCost(totalcost);
	Double cst = returnParams.get("cst");
	Double vat = returnParams.get("vat");
	float Tax = (float) (cst+vat);
	order.setTax(Tax);
	Double finalprice = returnParams.get("finalprice");
	float finalcost = finalprice.floatValue();
order.setTotalCost(finalcost);

	orderRepository.save(order);
	cartRepository.delete(cart);
	returnStatus.put("status", true);
	// status = "order placed";
	
	} catch (Exception e){
		 //status = "notallowed";
			returnStatus.put("status", false);

	}
	return returnStatus;
	
}

/*@RequestMapping("/user/removecartitem/{cartitemId}")		
public void removeCartitem(@PathVariable("cartitemId") int cartitemId) {	
	//HashMap<String, Double> returnParams = new HashMap<String, Double>();
	cartItemRepository.delete(cartitemId);
	
	return;
}*/

@RequestMapping("/user/removecartitem")		
public void removeCartitem(@RequestBody CartItem cartitem) {	
	//HashMap<String, Double> returnParams = new HashMap<String, Double>();
	int cartitemId = cartitem.getCartitemId();
	cartItemRepository.delete(cartitemId);
	
	return;
}



/*@RequestMapping("/public/user/verifytoken")
public HashMap<String, Object> verufyToken(@RequestBody Customer customer){
	HashMap<String, Object> returnParams=new HashMap<String, Object>();
	int token=customer.getToken();
	 String userName = SecurityContextHolder.getContext().getAuthentication().getName();
	  Customer customer1=  customerRepository.findByuserName(userName);
	int token1=customer1.getToken();
	if(token==token1){
		returnParams.put("msg", "Token matched succesfully");
	}
	else{
		returnParams.put("msg","Token didn't match" );
	}
	return returnParams;
	
}


@RequestMapping("/public/user/verifyemail")
public HashMap<String, Object> verifyEmail(@RequestBody Customer customer){
	HashMap<String, Object> returnParams=new HashMap<String, Object>();
	Random generator = new Random();
	generator.setSeed(System.currentTimeMillis());
	  
	int token = generator.nextInt(99999) + 99999;
	if (token < 100000 || token > 999999) {
	token = generator.nextInt(99999) + 99999;
	if (token < 100000 || token > 999999) {
	try {
		throw new Exception("Unable to generate PIN at this time..");
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	}
	}
	String email=customer.getEmailId();
	String ft=Integer.toString(token);
	String msg="Verification OTP is:";
	String finaltoken=msg.concat(ft);
	customer.setToken(token);
	customerRepository.save(customer);
	MailService mailService=new MailService();
	mailService.init(email, "Mail Verification", finaltoken);
	return (HashMap<String, Object>) returnParams.put("msg","Message sent Succesfully");
	
}

@RequestMapping("/public/user/changepassword")
public  HashMap<String, Object> savePassword(@RequestBody Customer customer){
	HashMap<String, Object> returnParams=new HashMap<String, Object>();
	String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    customer=  customerRepository.findByuserName(userName);
	String password=customer.getPassword();
	customer.setPassword(password);
	customerRepository.save(customer);
	return (HashMap<String, Object>) returnParams.put("msg","Password Succesfully Changed");
	
}*/






/*public void init(String to, String subject, String body){
	
	 //Create the application context
    ApplicationContext context = new FileSystemXmlApplicationContext("src/main/resources/application-context.xml");
       
      //Get the mailer instance
      ApplicationMailer mailer = (ApplicationMailer) context.getBean("mailService");

      //Send a composed mail
      mailer.sendMail(to,"Mail Verification",body);

      //Send a pre-configured mail
      mailer.sendPreConfiguredMail("Mail succesfully sent");
}*/

}

	


 