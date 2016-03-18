var app = angular.module('app', ['ngRoute','autocomplete','ui.bootstrap','ngAnimate']);


app.config([
		'$httpProvider',
		function($httpProvider) {
			$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		} ]);



app.config(['$routeProvider',
         function($routeProvider) {

           $routeProvider
           .when('/login', {
               templateUrl: 'login.html',
               controller: 'loginctrl'
       
      })
       .when('/home', {
         templateUrl: 'home.html',
         controller: 'homectrl'
       })
        .when('/viewbrand/:id', {
         templateUrl: 'brandproduct.html',
         controller: 'brandctrl'
       })
        .when('/viewcategory/:id', {
         templateUrl: 'categoryproduct.html',
         controller: 'categoryctrl'
       })

           .when('/gridview', {
         templateUrl: 'gridview.html',
         controller: 'gridctrl'
       })
      .when('/cart', {
        templateUrl: 'cart.html',
         controller: 'cartctrl'
       })
  .when('/orderconfirm', {
        templateUrl: 'orderdetails.html',
         controller: 'orderconfirmctrl'
       })
        .when('/orderconfirm', {
        templateUrl: 'orderconfirm.html',
         controller: 'orderconfirmctrl'
       })
      .when('/listview', {
        templateUrl: 'listview.html',
         controller: 'listctrl'
      })
   
               .when('/newcustomer', {
                 templateUrl: 'newcustomer.html',
                 controller: 'newcustomerctrl'
               })
                         .when('/editcustomer', {
         templateUrl: 'editcustomer.html',
         controller: 'editcustomerctrl'
       })     
               
                .when('/editshipping/:id', {
                 templateUrl: 'editshipping.html',
                 controller: 'editshippingctrl'
               })
			    
             .when('/editproduct/:id', {
                 templateUrl: 'editproduct.html',
                 controller: 'editproductctrl'
               })
    
              .when('/viewcustomer', {
               templateUrl: 'viewcust.html',
               controller: 'viewcustomerctrl'
             })
             .when('/viewproduct', {
               templateUrl: 'viewproducts2.html',
               controller: 'productctrl'
             })
              .when('/history', {
               templateUrl: 'orderhistory.html',
               controller: 'historyctrl'
             })
             
              .when('/historydetails/:id', {
               templateUrl: 'historydetails.html',
               controller: 'historydetailsctrl'
             })
             .when('/addproducts', {
                   templateUrl: 'addproduct.html',
                   controller: 'addproductctrl'
                 }) 
               .when('/adminhistory', {
         templateUrl: 'adminhistory.html',
         controller: 'adminhistoryctrl'
       })  
                 
                 
             .when('/orderhistorydetails/:id', {
         templateUrl: 'adminhistorydetails.html',
         controller: 'orderhistorydetailsctrl'
       })  
                .when('/checkout', {
         templateUrl: 'checkout.html',
         controller: 'checkoutctrl'
       })   
       
       
                 .otherwise({
                     redirectTo: '/gridview'
                    	 
                   })
                   
         }]);

app.run(function($rootScope, $http, $location){
	
	$http({
		method : 'GET',
		url : 'public/categories',     
	
	}).then(function(response) {
		$rootScope.categories = response.data;
		
	});
	
	
	$http({
		method : 'GET',
		url : 'public/brands',     
	
	}).then(function(response) {
		$rootScope.brands = response.data;
		
	});


$http({
				method : 'GET',
				url : '/public/log',     
				
			}).then(function(response) {
				
				$rootScope.response = response.data;
			debugger;
				if($rootScope.response.status=='true')
					{
/*					$rootScope.name=$rootScope.response.name;
*/				//alert('authentication Successfull');
$rootScope.authenticated = true;
if($rootScope.response.role=='user')
	{
	$rootScope.user=true;
	$rootScope.admin=false;

//alert($rootScope.user);
	}
else
	{
	$rootScope.admin=true;
	$rootScope.user=false;

	//alert($rootScope.admin);
	}
			
			/*	$location.path('/');*/
				
					}		
		
	
		else{
			$rootScope.authenticated = false;
			/*alert('authentication failed');
			alert($rootScope.authenticated);*/
		}
	
})

$rootScope.logOut= function(){
	//alert('Logout Successfully')
	$http({
		method : 'POST',
		url : 'logout',     
	
	}).then(function(response) {
		
		
		
	});
	$location.path('/login');
	$rootScope.authenticated = false;
	$rootScope.admin=false;
	$rootScope.user=false;
}



/*$rootScope.search= function(){
	
	
	$http({
		
		   method : 'GET',
	                           			
	                           			
	       url : 'public/products/'+$scope.productname,
	                           			
	        }).then(function(response) {
	                           			$rootScope.products = response.data;
	                           		
	                           		});
}*/

})

	


app.controller('loginctrl',[ '$scope', '$rootScope','$http', '$location', function($scope,$rootScope, $http, $location)
{

//	$scope.auth = {};
//	$scope.login = function(){
//		$rootScope.loadCustomers($scope.auth);
//	}
	
	
		/*if(auth)
			{*/
			
		/*var headers = {
				'Authorization' : 'Basic ' + encodedAuthData
				}
			} else {
				headers : {};
			}*/
	$scope.login = function() {
		var authData = $scope.auth.username + ':' + $scope.auth.password;
		var encodedAuthData = btoa(authData);
			$http({
				method : 'GET',
				url : '/public/log',     
				headers : {'Authorization' : 'Basic ' + encodedAuthData}
			}).then(function(response) {
				
				$rootScope.response = response.data;
			//	alert('authentication Successfull');
$rootScope.authenticated = true;
$rootScope.authenticatedadd=true;
if($rootScope.response.role=='user')
	{
	$rootScope.user=true;
	$rootScope.admin=false;
	//$rootScope.authenticatedadd=false;
//alert($rootScope.user);
	}
else
	{
	$rootScope.admin=true;
	$rootScope.user=false;
	//$rootScope.authenticatedadd=false;
	//alert($rootScope.admin);
	}
			
				$location.path('/');
				
				
		}, function(response){
			$rootScope.authenticated = false;
			alert('authentication failed');
			//alert($rootScope.authenticated);
		});
	}
}]);	

app.controller('brandctrl',[ '$scope', '$rootScope','$http','$routeParams' , 
                             function($scope,$rootScope, $http, $routeParams)
                             {
	
	
	
	$scope.init=function(){
		 
		$scope.maxSize=3;
	    $scope.currentPage=0;	 
	/*
	 $scope.intitPage=function(){
	 	$scope.page={
	    		 pageSize: 2,
	    		 pageCount: 0
	     };
	 }
	*/
	 	$scope.getProducts=function(){
	 		$scope.pageSize=3;
	 		$http.post('public/products?pc='+$scope.currentPage+'&ps='+$scope.pageSize).then(function(response) {
	 			$scope.products = response.data.content;	
	 			$scope.pages=response.data.totalPages;
	 		   $scope.bigTotalItems = response.data.totalElements;
	 			debugger;
	 			//$scope.page=$rootScope.getNumber(response.data.totalPages);
	 		});
	 	}

	 /*	$scope.toPageId = function(data){
	 		
	 		//$scope.intitPage();
	 		$scope.page.pageCount = data;
	 		$scope.getProducts();
	 	};
	 	
	 
		$scope. prevPage=function(){
		
			if ($scope.page.pageCount > 0) {
               var prev= $scope.page.pageCount-1;
                $scope.toPageId(prev);
            }
				
			     };
			     
			     $scope.nextPage=function(){
						
			    	 if ($scope.page.pageCount < $scope.pages) {
		                    var next=$scope.page.pageCount+1;
		                    $scope.toPageId(next);
		                }
						
						     };
			 
		$rootScope.getNumber=function(num){
			return new Array(num);
		}*/
		//$scope.intitPage();
	 	$scope.getProducts();
	    $scope.setPage = function(currentpage) { 
	        $scope.currentPage=currentpage;

	        $scope.getProducts();
	      };
		 
		
			
			
	
	$http({
			
		   method : 'GET',
	                           			
	                           			
	       url : '/public/products/brand/'+$routeParams.id,
	                           			
	        }).then(function(response) {
	                           			$scope.products = angular.copy(response.data);
	                           			 
	                           		});
	
    $scope.addtoCart = function(product){		
		/* $http({		
				method : 'GET',		
				url : '/products/'+$routeParams.id,		
			}).then(function(response) {		
				$rootScope.product = response.data;		
				 $scope.cartitem={ "quantity":1,		
				                   product:[],		
				 };		
				 //$scope.cartitem.product=[];		
				 $scope.cartitem.product.push($scope.product);		
		});*/		
					
	 		
	 $http({		
		 method:'GET',		
		 url: '/user/cartcheck'	 		
	 }).then(function(response){	            				
		 if(response.data.status=='true')		
			 {		
			   $scope.cartitem={ "quantity":1,		
	                 "product":product		
			                 }		
			 // alert('true');		
		 $http({		
			method : 'POST',		
			url : '/user/addcartitem',		
				data:$scope.cartitem,		
		}).then(function(response) {		
			//alert('cart item added');		
					
		})		
			 }		
			 else		
				 {		
    			// alert('false');		
    			 $scope.cartitem=[{ "quantity":1,		
    	                 "product":product		
    			 }];		
    			 $scope.cart={		
    					 //"cost":355,		
    					 "cartitem" : $scope.cartitem		
			 };		
    			// $scope.cart=[];		
    			// $scope.cart.push($scope.cartitem);		
    			
    			 $http({		
    					method : 'POST',		
    					url : '/user/addcart',		
    						data:$scope.cart,		
    				}).then(function(response) {		
    					//alert('cart added');		
    							
    				})		
				 }		
	 });		
					
	 		
	 		
	 		
	/* $scope.cartitem={ "quantity":1,		
	                 "product":product		
			 }		
			 $scope.cart={		
			              		
			             "cartitem" : $scope.cartitem		
			 };		
			 //$scope.cart.push($scope.cartitem);		
				
			 $http({		
					method : 'POST',		
					url : '/addtocart',		
						data:$scope.cartitem,		
				}).then(function(response) {		
					alert('');		
							
				});*/		
		 } ;
	};
	
	$scope.init();
                             }]);



app.controller('categoryctrl',[ '$scope', '$rootScope','$http','$routeParams' , 
                                function($scope,$rootScope, $http, $routeParams)
                                {
   	
   	
   	$scope.init=function(){
   		 
   		 
   		 
   		$scope.maxSize=3;
   	    $scope.currentPage=0;	 
   	/*
   	 $scope.intitPage=function(){
   	 	$scope.page={
   	    		 pageSize: 2,
   	    		 pageCount: 0
   	     };
   	 }
   	*/
   	 	$scope.getProducts=function(){
   	 		$scope.pageSize=3;
   	 		$http.post('public/products?pc='+$scope.currentPage+'&ps='+$scope.pageSize).then(function(response) {
   	 			$scope.products = response.data.content;	
   	 			$scope.pages=response.data.totalPages;
   	 		   $scope.bigTotalItems = 175;
   	 			debugger;
   	 			//$scope.page=$rootScope.getNumber(response.data.totalPages);
   	 		});
   	 	}

   	 /*	$scope.toPageId = function(data){
   	 		
   	 		//$scope.intitPage();
   	 		$scope.page.pageCount = data;
   	 		$scope.getProducts();
   	 	};
   	 	
   	 
   		$scope. prevPage=function(){
   		
   			if ($scope.page.pageCount > 0) {
                  var prev= $scope.page.pageCount-1;
                   $scope.toPageId(prev);
               }
   				
   			     };
   			     
   			     $scope.nextPage=function(){
   						
   			    	 if ($scope.page.pageCount < $scope.pages) {
   		                    var next=$scope.page.pageCount+1;
   		                    $scope.toPageId(next);
   		                }
   						
   						     };
   			 
   		$rootScope.getNumber=function(num){
   			return new Array(num);
   		}*/
   		//$scope.intitPage();
   	 	$scope.getProducts();
   	    $scope.setPage = function(currentpage) { 
   	        $scope.currentPage=currentpage;

   	        $scope.getProducts();
   	      };
   			
                                
   	$http({
   		
   		   method : 'GET',
   	                           			
   	                           			
   	       url : '/public/products/category/'+$routeParams.id,
   	                           			
   	        }).then(function(response) {
   	                           			$scope.products = angular.copy(response.data);
   	                           			 
   	                           		});
       $scope.addtoCart = function(product){		
   		/* $http({		
   				method : 'GET',		
   				url : '/products/'+$routeParams.id,		
   			}).then(function(response) {		
   				$rootScope.product = response.data;		
   				 $scope.cartitem={ "quantity":1,		
   				                   product:[],		
   				 };		
   				 //$scope.cartitem.product=[];		
   				 $scope.cartitem.product.push($scope.product);		
   		});*/		
   					
   	 		
   	 $http({		
   		 method:'GET',		
   		 url: '/user/cartcheck'	 		
   	 }).then(function(response){	            				
   		 if(response.data.status=='true')		
   			 {		
   			   $scope.cartitem={ "quantity":1,		
   	                 "product":product		
   			                 }		
   			 // alert('true');		
   		 $http({		
   			method : 'POST',		
   			url : '/user/addcartitem',		
   				data:$scope.cartitem,		
   		}).then(function(response) {		
   		//	alert('cart item added');		
   					
   		})		
   			 }		
   			 else		
   				 {		
       			// alert('false');		
       			 $scope.cartitem=[{ "quantity":1,		
       	                 "product":product		
       			 }];		
       			 $scope.cart={		
       					 //"cost":355,		
       					 "cartitem" : $scope.cartitem		
   			 };		
       			// $scope.cart=[];		
       			// $scope.cart.push($scope.cartitem);		
       			
       			 $http({		
       					method : 'POST',		
       					url : '/user/addcart',		
       						data:$scope.cart,		
       				}).then(function(response) {		
       					//alert('cart added');		
       							
       				})		
   				 };
   	
   	 });		
   					
   	 		
   	 		
   	 		
   	/* $scope.cartitem={ "quantity":1,		
   	                 "product":product		
   			 }		
   			 $scope.cart={		
   			              		
   			             "cartitem" : $scope.cartitem		
   			 };		
   			 //$scope.cart.push($scope.cartitem);		
   				
   			 $http({		
   					method : 'POST',		
   					url : '/addtocart',		
   						data:$scope.cartitem,		
   				}).then(function(response) {		
   					alert('');		
   							
   				});*/		
   		 } ;
   	};
   	$scope.init();
                                
                                }]);	


/*app.run(function($rootScope, $http){
	$rootScope.loadUsers = function(auth) {
		if(auth)
			{
			var authData = auth.username + ':' + auth.password;
		var encodedAuthData = btoa(authData);
		headers = {
				'Authorization' : 'Basic ' + encodedAuthData
				}
			} else {
				headers : {};
			}
			$http({
				method : 'GET',
				url : '/users',     
				headers : headers
			}).then(function(response) {
				$rootScope.users = response.data;
				$rootScope.authenticated = true;
		});
		};
	});*/



app.controller('productctrl',[ '$scope', '$rootScope','$http',function($scope,$rootScope, $http)
                          	     {
	$scope.title="List Of Products";
	//$scope.products={};
	$http({
		method : 'GET',
		url : '/public/viewproducts',	
	}).then(function(response) {
	
		$rootScope.products = angular.copy(response.data);		 
	});
                          			  }]);




app.controller('homectrl', ['$scope', function($scope) { 
	   
	   
}])


app.controller('viewcustomerctrl', [ '$scope','$route','$routeParams', '$rootScope','$http',
                               	     function($scope,$route,$routeParams,$rootScope, $http){
    
	$http({
			
		   method : 'GET',
	                           			
	                           			
	       url : '/user/customers/one',
	                           			
	        }).then(function(response) {
	                           			$scope.customer = angular.copy(response.data);
	                           			 
	                           		});
	
	 $http({
			method : 'GET',
			url : '/user/displaystate',     
		
		}).then(function(response) {
			$rootScope.statevat = response.data;
			
	});
	 $http({
			method : 'GET',
			url : 'user/shippingaddresses/one',
			
		}).then(function(response) {
			$rootScope.shippingaddresses = angular.copy(response.data);
			 
		});
	 $scope.addShipping = function(){		
			debugger;
			$http({		
				method: 'POST',		
				url : '/user/addshippingaddress',		
				data : $scope.shippingAddress		
			}).then(function(response){		
				if(response.data.status){		
					/*$scope.shippingAddresses=[];*/		
/*		            $scope.shippingAddresses.push($scope.shippingAddress);		
*/					//alert('shippingaddress Added Successfully!');	
					//location.reload();
				}		
				})		
			};
}])


			 
app.controller('editcustomerctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                           	     function($scope,$route,$routeParams,$rootScope, $http)
                           	     {
                           			 
    $scope.title=' Edit My Profile';
                           	    
                  	    
    $http({
		method : 'GET',
		url : '/user/displaystate',     
	
	}).then(function(response) {
		$rootScope.statevat = response.data;
		
});
    
   $http({
                           			
	   method : 'GET',                     			
       url : '/user/customers/one',
                           			
        }).then(function(response) {
                           			$scope.edit = angular.copy(response.data);
                           			 
                           		});
                        	                      		
    $scope.savedetails = function(){	
			
  		 $http({
  				method: 'POST',
  				url : '/user/savedetails',
  				data : $scope.edit  			
  			}).then(function(response){
  				if(response.data.status){
  					//alert('customer edit Successfully!');
  				//	$scope.edit= {};
  					
  				} else {
  					//alert('customer edit Failed!');
  				}
  			});
  			};     
// $scope.addEntry=function(){
//            $scope.shippingAddresses.push($scope.shippingAddress);
//             $scope.shippingAddress='';
//    }
	
	/*$scope.shippingAddresses=[];
	$scope.shippingAddress={};
	
	 $http({
			method : 'GET',
			url : '/addshippingaddress',
			
		}).then(function(response) {
			$scope.shippingAddress = angular.copy(response.data);
			 
		});
     */
  			//$rootScope.shippingAddress={};
  			
  			 $http({
  				method : 'GET',
  				url : 'user/shippingaddresses/one',
  				
  			}).then(function(response) {
  				$rootScope.shippingaddresses = angular.copy(response.data);
  				 
  			});
  			 
  
	 $scope.addShipping = function(){
		
			$http({
				method: 'POST',
		
				url : 'user/addshippingaddress',
				data : $scope.shippingAddress
			}).then(function(response){
				if(response.data.status){
					$scope.shippingaddresses.push($scope.shippingAddress);
					
					//alert('shippingaddress Added Successfully!');
												} 
				
				else {
					//alert('shippingaddress Addition Failed!');
				       }
			});
		};
		   			
                           	     }]);

			  



			                            			  	  

 app.controller('newcustomerctrl', [ '$scope', '$route','$routeParams','$rootScope','$http',
			                    			 function($scope,$route,$routeParams,$rootScope, $http) {
	$scope.title="New Customer Registration";
	$scope.customers={};
	
	 $scope.savecustomer = function(){
		 $scope.customers.role="USER";	
			
			$http({
				method: 'POST',
				url : '/public/savecustomer',
				data : $scope.customers
			}).then(function(response){
				debugger;
				if(response.data.status){
					//alert('Customer Registered Successfully!');
					
					
												}
				else if(response.data.msg1){
					alert('Username already exists');
					
					
												}
				
				else {
					//alert('Customer Addition Failed! Username/EmailId exists');
					
				       }
			});
		};
	} ]);
 
 
 

 
 

 
 
 
  app.controller('editshippingctrl',[ '$scope','$route','$routeParams', '$rootScope','$http','$location',
	     function($scope,$route,$routeParams,$rootScope, $http,$location)
	     {
	  
	  $http({
			method : 'GET',
			url : '/user/displaystate',     
		
		}).then(function(response) {
			$rootScope.statevat = response.data;
			
	});
	  
	  
	  
			 
	  $http({
 			
		   method : 'GET',
	                           			
	                           			
	       url : 'user/shippingaddress/'+$routeParams.id,
	                           			
	        }).then(function(response) {
	                           			$scope.edit1 = angular.copy(response.data);
	                           			 
	                           		});
	                           	    
	                           	    
	                     		
	    $scope.editShipping = function(){	
				
	  		 $http({
	  				method: 'POST',
	  				url : '/user/editshippingaddress',
	  				data : $scope.edit1,
	  			
	  			}).then(function(response){
	  				if(response.data.status){
	  					
	  					
	  					//alert('Address edit Successfully!');
	  					$scope.edit1= {};
	  					$location.url('/viewcustomer');
	  					
	  				} else {
	  					//alert('Address edit Failed!');
	  				}
	  			});
	  			};     
			  }]);		
 
  
  
 
 

 
 
 app.controller('editproductctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                           	     function($scope,$route,$routeParams,$rootScope, $http)
                           	     {
                           			  
                           	    	$scope.title=' Edit Product!!!';
                            	    
                             	   /*   $scope.product=
                             	  	                {
                             	  	                  "productName": "hhh",
                             	  	                  
                             	  	                
                             	  	                 }  */       
                           	    	
                           	    	
                           	    	$http({
                           	 		method : 'GET',
                           	 		url : '/public/categories',     
                           	 	
                           	 	}).then(function(response) {
                           	 		$rootScope.categories = response.data;
                           	 		
                           	 	});
                           	    	
                           	    	
                           	    	$http({
                               	 		method : 'GET',
                               	 		url : '/public/brands',     
                               	 	
                               	 	}).then(function(response) {
                               	 		$rootScope.brands = response.data;
                               	 		
                               	 	});
                           	    	
                           	    	
                           	    	
                             	     $http({
                                  			
                             	   	   method : 'GET',                          			
                             	     url : 'public/product/'+$routeParams.id,
                             	                              			
                             	           }).then(function(response) {
                             	                              			$scope.product = angular.copy(response.data);
                             	                              		
                             	                              		});
                             	    	 
                             	    	 $scope.editproduct = function(){	
                             				
                             	   		 $http({
                             	   				method: 'POST',
                             	   				url : '/admin/saveproduct',
                             	   				data : $scope.product,
                             	   			
                             	   			}).then(function(response){
                             	   				if(response.data.status){
                             	   					//alert('product edit Successfully!');
                             	   					$scope.product= {};
                             	   					
                             	   				} else {
                             	   					//alert('product edit Failed!');
                             	   				}
                             	   			});
                             	   			};   
                             	      }]);
 
 
 app.controller('addproductctrl', [ '$scope','fileUpload','$route','$routeParams','$location', '$rootScope','$http',
                          	     function($scope,fileUpload,$route,$routeParams,$location,$rootScope, $http){
    
	
	 $scope.init=function(){
	 $http({
			method : 'GET',
			url : '/public/categories',     
		
		}).then(function(response) {
			$rootScope.categories = response.data;
			
	})
	
	$http({
			method : 'GET',
			url : '/public/brands',     
		
		}).then(function(response) {
			$rootScope.brands = response.data;
			
	})

 };
	 $scope.product={};
	
		$scope.uploadFile = function(){
	        var file = $scope.myFile;
	        console.log('file is ' );
	        console.dir(file);
	        var uploadUrl = "admin/saveproduct";
	        fileUpload.uploadFileToUrl(file, uploadUrl);
	        if(fileUpload.uploadFileToUrl(file, uploadUrl)){
	        	//alert("Image uploaded successfully");
	        }
		};
		
		$rootScope.loadImageFileAsURL=function(){

		    var filesSelected = document.getElementById("inputFileToLoad").files;
		    if (filesSelected.length > 0){
		        var fileToLoad = filesSelected[0];

		        var fileReader = new FileReader();

		        fileReader.onload = function(fileLoadedEvent) {
		            $rootScope.srcData = fileLoadedEvent.target.result; // <--- data: base64

		            var divTest = document.getElementById("imgTest");
		            var newImage = document.createElement('img');
		            newImage.src = $rootScope.srcData;

//		            divTest.innerHTML = newImage.outerHTML;

		        }

		        fileReader.readAsDataURL(fileToLoad);
		    }
		};
		
		$scope.addCategory=function(){
			 $http({
	  				method: 'POST',
	  				url : '/admin/addcategory',
	  				data : $scope.category,
	  			
	  			}).then(function(response){
	  				if(response.data.status){
	  					//$scope.category.push($scope.category);
	  				//	alert('Category added Successfully!');
	  					//$scope.category= {};
//	  					location.reload();
	  					$scope.init();
	  				}
	  				 else if (response.data.msg1)
		 				{
		 					//alert('Category addition faied!!Category already exists');
		 				}
	  				 else {
	  					//alert('Failed!');
	  				}
	  			});
		}
		
		
$scope.addBrand=function(){
	$http({
			method: 'POST',
			url : '/admin/addbrand',
			data : $scope.brand,
		
		}).then(function(response){
			if(response.data.status){
				//$scope.brand.push($scope.brand);
				//alert('Brand Added Successfully!');
				//$scope.brand= {};
					$scope.init();
				
			} 
			else if (response.data.msg1)
			{
				//alert('Brand addition faied!!Brand already exists');
			}
		
			else {
				//alert(' Failed!');
			}
		});
		}


$scope.saveproduct = function(){
	//alert();
	$scope.product.image=$rootScope.srcData;
	$scope.product.extn="jpg";
			
			/*$scope.product={
					"name":"",
					"price":"",
					"quantity":"",
					"extn":"jpg",
					"image":$rootScope.srcData,
					brand:{
						"brandName":""
					},
					category:{
						"categoryName":""
					}
			};*/

			$http({
				method: 'POST',
				url : 'admin/saveproduct',
				data : $scope.product
			}).then(function(response){
				if(response.data.status){
					//alert('product Added Successfully!');	
					
					$scope.product={};
					$location.url('/gridview')
												} 
				
				else {
					//alert('product Addition Failed!');
				       }
			});
		};
			$scope.init();
                                                
 }])
 
 
 
 
 app.controller('adminhistoryctrl',[ '$scope', '$rootScope','$http','$routeParams', '$location', function($scope,$rootScope, $http,$routeParams, $location)
{
	 /*$http({

			method : 'GET',

			url : 'admin/orders',

		}).then(function(response) {
			$scope.customerorders = response.data;
		});*/
	 
	 $scope.maxSize=3;
	    $scope.currentPage=0;	 
		
	 	$scope.getOrders=function(){
	 		$scope.pageSize=8;
	 		$http.get('admin/orders?pc='+$scope.currentPage+'&ps='+$scope.pageSize).then(function(response) {
	 			$scope.customerorders = response.data.content;	
	 			$scope.pages=response.data.totalPages;
	 		   $scope.bigTotalItems =response.data.totalElements;
	 			debugger;
	 		});
	 	}

	 	$scope.getOrders();
	 
	    $scope.setPage = function(currentpage) { 
	        $scope.currentPage=currentpage;

	        $scope.getOrders();
	      };
		
	      $scope.autofetch = function(search) {
	    	//alert("Injected");

	    	        // var status=$scope.state.title;
	    	        $http({
	    	            method: 'GET',
	    	            url: '/autosearchbyname/'+search  ,
	    	            
	    	                          
	    	        }).then(function(response) {
	    	        
	    	            $scope.names = response.data;
	    	            
	    	        });
	    	    }
	      
	$scope.searching = function(query) {

		$http({

			method : 'GET',

			url : '/admin/orders/search/'+query,

		}).then(function(response) {

			$scope.customerorders = response.data;

		});
	};

//	$scope.init();
		
}]);
 
 app.controller('orderhistorydetailsctrl',[ '$scope', '$rootScope','$routeParams','$http',function($scope,$rootScope,$routeParams, $http)
                                	     {
            $scope.title="History of orders";
            $http({
          		method : 'GET',
          		url : 'admin/order/'+$routeParams.id,
          	}).then(function(response) {
          		$scope.orders = response.data;
          		
          });	   
           
            $http({

    			method : 'GET',

    			url : 'admin/ordercost/'+$routeParams.id,

    		}).then(function(response) {
    			$scope.orderscost = response.data;
    			debugger;
    		});
    	
            $http({

    			method : 'GET',

    			url : 'admin/orders/'+$routeParams.id,

    		}).then(function(response) {
    			$scope.customerorders = response.data;
    			//$scope.orders=customer.order;
    			
    		});


                                	     }]);

 
 app.controller('gridctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                       	     function($scope,$route,$routeParams,$rootScope, $http)
       
                       	     
                       	     {
  $scope.maxSize=3;
    $scope.currentPage=0;	 
/*
 $scope.intitPage=function(){
 	$scope.page={
    		 pageSize: 2,
    		 pageCount: 0
     };
 }
*/
 	$scope.getProducts=function(){
 		$scope.pageSize=6;
 		$http.get('public/products?pc='+$scope.currentPage+'&ps='+$scope.pageSize).then(function(response) {
 			$rootScope.products = response.data.content;	
 			$scope.pages=response.data.totalPages;
 		   $scope.bigTotalItems = response.data.totalElements;
 			debugger;
 			//$scope.page=$rootScope.getNumber(response.data.totalPages);
 		});
 	}

 /*	$scope.toPageId = function(data){
 		
 		//$scope.intitPage();
 		$scope.page.pageCount = data;
 		$scope.getProducts();
 	};
 	
 
	$scope. prevPage=function(){
	
		if ($scope.page.pageCount > 0) {
           var prev= $scope.page.pageCount-1;
            $scope.toPageId(prev);
        }
			
		     };
		     
		     $scope.nextPage=function(){
					
		    	 if ($scope.page.pageCount < $scope.pages) {
	                    var next=$scope.page.pageCount+1;
	                    $scope.toPageId(next);
	                }
					
					     };
		 
	$rootScope.getNumber=function(num){
		return new Array(num);
	}*/
	//$scope.intitPage();
 	$scope.getProducts();
    $scope.setPage = function(currentpage) { 
        $scope.currentPage=currentpage;

        $scope.getProducts();
      };
	
	/*$scope.loadTags = function(query) {
        return $http({
            method: 'GET',
            url : '/public/productsearch',
        });debugger;
    }*/
             $scope.title="List Of Products";
			//  $scope.filter=function(){
				/*$scope.map={
						
						category:"Tshirt",
						brand:["UCB"],
				};*/
             
             $scope.map={
						
						category:{},
						brand:[],
				};
             $scope.selection = [];
             $scope.toggleSelection = function toggleSelection(brandName) {
            	    var idx = $scope.map.brand.indexOf(brandName);

            	    // is currently selected
            	    if (idx > -1) {
            	      $scope.map.brand.splice(idx, 1);
            	    }

            	    // is newly selected
            	    else {
            	      $scope.map.brand.push(brandName);
            	    }
            	  };
            	  
			 $scope.filterCategoryBrand=function(){
				 debugger;
				 $http({		
 					method : 'POST',		
 					url : '/public/productsearch',		
 						data:$scope.map,		
 				}).then(function(response) {		
 							
 					$scope.products = response.data;	
 				})		
				 };		
	

             $scope.addtoCart = function(product){		
            		/* $http({		
            				method : 'GET',		
            				url : '/products/'+$routeParams.id,		
            			}).then(function(response) {		
            				$rootScope.product = response.data;		
            				 $scope.cartitem={ "quantity":1,		
            				                   product:[],		
            				 };		
            				 //$scope.cartitem.product=[];		
            				 $scope.cartitem.product.push($scope.product);		
            		});*/		
            					
            	 		
            	 $http({		
            		 method:'GET',		
            		 url: '/user/cartcheck'	 		
            	 }).then(function(response){	            				
            		 if(response.data.status=='true')		
            			 {		
            			   $scope.cartitem={ "quantity":1,		
            	                 "product":product		
            			                 }		
            			 // alert('true');		
            		 $http({		
  					method : 'POST',		
  					url : '/user/addcartitem',		
  						data:$scope.cartitem,		
  				}).then(function(response) {		
  					//alert('cart item added');		
  							
  				})		
            			 }		
            			 else		
            				 {		
	            			// alert('false');		
	            			 $scope.cartitem=[{ "quantity":1,		
	            	                 "product":product		
	            			 }];		
	            			 $scope.cart={		
	            					 //"cost":355,		
	            					 "cartitem" : $scope.cartitem		
            			 };		
	            			// $scope.cart=[];		
	            			// $scope.cart.push($scope.cartitem);		
	            			
	            			 $http({		
	            					method : 'POST',		
	            					url : '/user/addcart',		
	            						data:$scope.cart,		
	            				}).then(function(response) {		
	            				//	alert('cart added');		
	            							
	            				})		
            				 }		
            	 });		
            					
            	 		
            	 		
            	 		
            	/* $scope.cartitem={ "quantity":1,		
            	                 "product":product		
            			 }		
            			 $scope.cart={		
            			              		
            			             "cartitem" : $scope.cartitem		
            			 };		
            			 //$scope.cart.push($scope.cartitem);		
            				
            			 $http({		
            					method : 'POST',		
            					url : '/addtocart',		
            						data:$scope.cartitem,		
            				}).then(function(response) {		
            					alert('');		
            							
            				});*/		
            		 }                     			  		
            	                          	
                      			  

                       	     
/*	$http({
		method : 'GET',
		url : 'public/products',	
	}).then(function(response) {
	
		$rootScope.products = angular.copy(response.data);		 
	});*/



$scope.autofetch = function(search) {
//alert("Injected");

        // var status=$scope.state.title;
        $http({
            method: 'GET',
            url: '/autosearchbytitle/'+search  ,
            
                          
        }).then(function(response) {
        
            $scope.names = response.data;
            
        });
    }
    
$scope.search= function(query){


$http({
	
	   method : 'GET',
                           			
                           			
       url : 'public/products/'+query,
                           			
        }).then(function(response) {
        	
        	$scope.products=[];
        	debugger;
                           			$scope.products.push(response.data);
                           			
                           		
                           		});};
                          			  }]);


 
 
 app.controller('listctrl', [ '$scope','$route','$routeParams', '$rootScope','$http',
                          	     function($scope,$route,$routeParams,$rootScope, $http){
    
	 
	 $http({
			method : 'GET',
			url : 'public/products'
		}).then(function(response) {
			$rootScope.products = response.data;
	});
                                                             
 }])
 
 
 
 
 app.controller('cartctrl', ['$scope','$route','$routeParams', '$rootScope','$location','$http',		
                     	     function($scope,$route,$routeParams,$rootScope,$location, $http){		
	$scope.start=function(){		
	 $http({		
			method : 'GET',		
			url : '/user/shippingaddresses/one',		
					
		}).then(function(response) {		
			$scope.shippingAddresses = angular.copy(response.data);		
			 		
		});		
	 $http({
			method : 'GET',
			url : '/user/displaystate',     
		
		}).then(function(response) {
			$rootScope.statevat = response.data;
			
	});
			
			
	$scope.changeQuantity= function(item){		
				
		 $http({		
				method : 'POST',		
				url : '/user/addcartitemquantity',		
					data: item,		
			}).then(function(response) {		
				//alert('cart item added');		
				$scope.init();		
			})			
	}	
	
	
	$scope.calculateVat= function(position, entity,sa){		
		 angular.forEach(entity, function(sa, index) {
		    if (position != index) 
		      sa.checked = false;
	   })
		 $http({		
				method : 'POST',		
				url : '/user/calculatevat',		
				data: sa,		
			}).then(function(response) {		
				$rootScope.tax=response.data;	
				//location.reload();
				$Sscope.start();
				$scope.getVat();
				$scope.init();
				//$scope.selected=true;		
						
				alert('vat');		
						
			})			
	}

		
	//$scope.cart={};	
	$scope.getVat=function(){
	$http({
		method : 'GET',
		url : '/user/getvat',     
	
	}).then(function(response) {
		$scope.tax=response.data;
		//$rootScope.tax =response.data;
		//$scope.selected=true;
		if($scope.tax.status==0)
			{
		

			$scope.selected=false;	
			}else
				{
				$scope.selected=true;
				}
		
	});};
	/*$scope.calculateVat= function(position, entity,sa){		
		 angular.forEach(entity, function(sa, index) {
 		    if (position != index) 
 		      sa.checked = false;
 	   })
		 $http({		
				method : 'POST',		
				url : '/user/calculatevat',		
				data: sa,		
			}).then(function(response) {		
				$rootScope.tax=response.data;		
				$scope.selected=true;		
						
				alert('vat');		
				//location.reload();		
			})			
	}		
	//$scope.cart={};		
	$http({
		method : 'GET',
		url : '/user/getvat',     
	
	}).then(function(response) {
		$rootScope.tax = response.data;
		$scope.selected=true;
});*/
	$scope.placeOrder= function(){		
		
		 $http({		
				method : 'GET',		
				url : '/user/placetheorder',		
					
			}).then(function(response) {
				
				$scope.status=response.data;
				if(response.data.status)
					{
					//alert('orderplaced');
				$location.path('/');
					}
				else
					alert('Please add items to the cart and select a shipping address')
			})			
	}	
	$scope.init=function(){
	  $http({		
					
		   method : 'GET',		
	                           					
	                           					
	       url : 'user/cart',		
	                           					
	        }).then(function(response) {		
	                           			$scope.cart = angular.copy(response.data);		
	                           			$scope.cartitems=$scope.cart.cartitem;
	                           			if($scope.cart=="" || $scope.cartitems=='')
                           				{
		                         
                           				$scope.empty=true;
                           				}
	                           		});	};
	  
	  
	  $scope.removeItem = function(item){	
		  
		  $http({		
			method: 'POST',		
			url : '/user/removecartitem',
				data: item,
			
		}).then(function(response){	
			
				//$scope.cartitems.splice($scope.cartitems.indexOf(item),1);
						
				//alert('cartitem deleted!');	
				/*location.reload();*/
				$scope.init();
			})		
		}	

	  /*$scope.removeItem=function(item){
			//$rootScope.customers.splice($rootScope.tasks.indexOf(task),1);

			$http.delete('/user/removecartitem'/+item.cartitemId)
			.then(function(response){
				if(response.data){
					alert('task deleted');
				}
			})
			
		}*/

	  		
	  $scope.addShipping = function(){		
					
			$http({		
				method: 'POST',		
				url : '/user/addshippingaddress',		
				data : $scope.shippingAddress		
			}).then(function(response){		
				if(response.data.status){		
					/*$scope.shippingAddresses=[];*/		
		            $scope.shippingAddresses.push($scope.shippingAddress);		
					//alert('shippingaddress Added Successfully!');	
					//location.reload();
				}		
				})		
			};
			$scope.init();
	};
	$scope.start();
 }])
 

 app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);


app.controller('orderconfirmctrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
	
	
	
}]);


app.controller('historyctrl',[ '$scope', '$rootScope','$http',function($scope,$rootScope, $http)
                      	     {
  $scope.title="My orders";
  $http({
			method : 'GET',
			url : '/user/myorders',
		}).then(function(response) {
			$scope.orders = response.data;
});	   
                      	     }]);


  app.controller('historydetailsctrl',[ '$scope', '$rootScope','$routeParams','$http',function($scope,$rootScope,$routeParams, $http)
                      	     {
  $scope.title="History of orders";
  $http({
		method : 'GET',
		url : 'user/order/'+$routeParams.id,
	}).then(function(response) {
		$scope.orders = response.data;
		
});	   

                      	     }]);

  
  
  app.controller('verifyemailctrl',[ '$scope', '$rootScope','$routeParams','$http',function($scope,$rootScope,$routeParams, $http)
                             	     {
  $scope.verify={};
	
	 $scope.send = function(){				
			$http({
				method: 'POST',
				url : '/public/user/verifyemail',
				data : $scope.verify
			}).then(function(response){
				if(response.data.status){
					alert('OTP Sent Successfully!');
												} 
				else {
					alert('OTP Sent Failed!');
				       }
			});
		};

       

                             	     }]);



app.controller('tokenctrl',[ '$scope', '$rootScope','$routeParams','$http',function($scope,$rootScope,$routeParams, $http)
                             	     {

  $scope.verify={};
	
	 $scope.OTPCheck = function(){				
			$http({
				method: 'POST',
				url : '/public/user/verifytoken',
				data : $scope.verify
			}).then(function(response){
				if(response.data.status){
					alert('Verified Successfully!');
												} 
				else {
					alert('Verification Failed!');
				       }
			});
		};

                             	     }]);


app.controller('changepasswordctrl',[ '$scope', '$rootScope','$routeParams','$http',function($scope,$rootScope,$routeParams, $http)
  
                                    {
  $scope.savePassword=function(){
	  var firstInput=document.getElmentById("upassword1").value;
	  var secondInput=document.getElementById("upassword2").value;
	  if(firstInput==secondInput){
		  alert("password matched Succesfully");
	
		  $http({
				method: 'POST',
				url : '/public/user/changepassword',
				data : $scope.verify
			}).then(function(response){
				if(response.data.status){
					alert('Password Saved Successfully!');
												} 
				else {
					alert('Password Saving Failed!');
				       }
			});
	  }
	  else
		  {
		  alert("Password didn't match");
		  }
  }

                             	     }]);
app.controller('checkoutctrl',['$scope','$http',function($scope,$http) {
	  $scope.oneAtATime = true;
	 
	  $scope.shippingAddress={};  

	  $scope.status = [true, false];

	  $scope.addShipping = function(){	
		  
		  
			
		$http({		
			method: 'POST',		
			url : '/user/addshippingaddress',		
			data : $scope.shippingAddress		
		}).then(function(response){		
			if(response.data.status){		
				/*$scope.shippingAddresses=[];*/		
	            $scope.shippingAddresses.push($scope.shippingAddress);		
			//	alert('shippingaddress Added Successfully!');	
				//location.reload();
			}		
			})		
		};
	  $scope.start=function(){	
			 $http({		
					method : 'GET',		
					url : '/user/shippingaddresses/one',		
							
				}).then(function(response) {		
					$scope.shippingAddresses = angular.copy(response.data);		
					 		
				});		
			 $http({
					method : 'GET',
					url : '/user/displaystate',     
				
				}).then(function(response) {
					$scope.statevat = response.data;
					
			});
					
				
				
			$scope.changeQuantity= function(item){		
						
				 $http({		
						method : 'POST',		
						url : '/user/addcartitemquantity',		
							data: item,		
					}).then(function(response) {		
						//alert('cart item added');		
						$scope.init();		
					})			
			}	
			
			
			$scope.calculateVat= function(sa,$index){		
				$scope.status[1]=true;
				//$scope.status[0]=false;
			    $scope.selected=true;
			   
			 $scope.selectedIndex = $index;
				 $http({		
						method : 'POST',		
						url : '/user/calculatevat',		
						data: sa,		
					}).then(function(response) {		
						$scope.tax=response.data;	
						//location.reload();
						//$Sscope.start();
						//$scope.getVat();
						$scope.init();
						//$scope.selected=true;		
								
						//alert('vat');		
								
					})			
			}

				
			//$scope.cart={};	
			$scope.getVat=function(){
			$http({
				method : 'GET',
				url : '/user/getvat',     
			
			}).then(function(response) {
				$scope.tax=response.data;
				
				if($scope.tax.status==0)
					{
				

					$scope.selected=false;	
					}else
						{
						$scope.selected=true;
						}
				
			});
			};
			
			$scope.placeOrder= function(){		
				
				 $http({		
						method : 'GET',		
						url : '/user/placetheorder',		
							
					}).then(function(response) {
						
						$scope.status=response.data;
						if(response.data.status)
							{
							//alert('orderplaced');
						$location.path('/');
							}
						else
						alert('Please add items to the cart and select a shipping address')
					})			
			}	
			$scope.init=function(){
			  $http({		
							
				   method : 'GET',		
			                           					
			                           					
			       url : 'user/cart',		
			                           					
			        }).then(function(response) {		
			                           			$scope.cart = angular.copy(response.data);		
			                           			$scope.cartitems=$scope.cart.cartitem;		
			                          		  $scope.getVat();

			                           		});	};
			  
			  
			  $scope.removeItem = function(item){	
				  
				  $http({		
					method: 'POST',		
					url : '/user/removecartitem',
						data: item,
					
				}).then(function(response){	
					
						
						$scope.init();
					})		
				}	

			 

			  		
			
					$scope.init();
			};
			$scope.start();

			  
	    }])
          