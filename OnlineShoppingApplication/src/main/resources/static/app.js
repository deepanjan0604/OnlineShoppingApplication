var app = angular.module('app', ['ngRoute']);

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

           .when('/gridview', {
         templateUrl: 'gridview.html',
         controller: 'gridctrl'
       })
       .when('/cart/:id', {
        templateUrl: 'gridview.html',
         controller: 'cartitemctrl'
       })
      .when('/cart', {
        templateUrl: 'cart2.html',
         controller: 'cartctrl'
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
               templateUrl: 'viewcustomer.html',
               controller: 'viewcustomerctrl'
             })
             .when('/viewproduct', {
               templateUrl: 'viewproducts2.html',
               controller: 'productctrl'
             })
             .when('/addproducts', {
                   templateUrl: 'addproduct.html',
                   controller: 'addproductctrl'
                 }) 
                 
                 
                 .otherwise({
                     redirectTo: '/home'
                    	 
                   })
                   
         }]);

app.run(function($rootScope, $http, $location){
	
	$http({
		method : 'GET',
		url : '/categories',     
	
	}).then(function(response) {
		$rootScope.categories = response.data;
		
	});


$http({
				method : 'GET',
				url : '/log',     
				
			}).then(function(response) {
				
				$rootScope.response = response.data;
				if($rootScope.response.status=='true')
					{
				alert('authentication Successfull');
$rootScope.authenticated = true;
if($rootScope.response.role=='user')
	{
	$rootScope.user=true;
	$rootScope.admin=false;

alert($rootScope.user);
	}
else
	{
	$rootScope.admin=true;
	$rootScope.user=false;

	alert($rootScope.admin);
	}
			
				
					}		
		
	
		else{
			$rootScope.authenticated = false;
			/*alert('authentication failed');
			alert($rootScope.authenticated);*/
		}
	
})

$rootScope.logOut= function(){
	alert('Logout Successfully')
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
				url : '/log',     
				headers : {'Authorization' : 'Basic ' + encodedAuthData}
			}).then(function(response) {
				
				$rootScope.response = response.data;
				alert('authentication Successfull');
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
			
				$location.path('/');
				
				
		}, function(response){
			$rootScope.authenticated = false;
			alert('authentication failed');
			alert($rootScope.authenticated);
		});
	}
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
		url : '/viewproducts',	
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
	                           			
	                           			
	       url : '/customers/one',
	                           			
	        }).then(function(response) {
	                           			$scope.customer = angular.copy(response.data);
	                           			 
	                           		});
	
	
	 $http({
			method : 'GET',
			url : '/shippingaddresses/one',
			
		}).then(function(response) {
			$rootScope.shippingaddresses = angular.copy(response.data);
			 
		});
}])


			 
app.controller('editcustomerctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                           	     function($scope,$route,$routeParams,$rootScope, $http)
                           	     {
                           			 
    $scope.title=' Edit Customer!!!';
                           	    
                  	    
    $http({
		method : 'GET',
		url : '/displaystate',     
	
	}).then(function(response) {
		$rootScope.statevat = response.data;
		
});
    
   $http({
                           			
	   method : 'GET',
                           			
                           			
       url : '/customers/one',
                           			
        }).then(function(response) {
                           			$scope.edit = angular.copy(response.data);
                           			 
                           		});
                           	    
                           	    
 /*$scope.edit={
		 customers:{
			 
			 }                      				
 }
  */                         		
    $scope.savedetails = function(){	
			
  		 $http({
  				method: 'POST',
  				url : '/savedetails',
  				data : $scope.edit,
  			
  			}).then(function(response){
  				if(response.data.status){
  					alert('customer edit Successfully!');
  					//$scope.edit= {};
  					
  				} else {
  					alert('customer edit Failed!');
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
  				url : '/shippingaddresses/one',
  				
  			}).then(function(response) {
  				$rootScope.shippingaddresses = angular.copy(response.data);
  				 
  			});
  			 
  
	 $scope.addShipping = function(){
		
			$http({
				method: 'POST',
				url : '/addshippingaddress',
				data : $scope.shippingAddress
			}).then(function(response){
				if(response.data.status){
					alert('shippingaddress Added Successfully!');
					
					
				
				/*	$rootScope.shippingaddresses.push($rootScope.shippingAddress);	
					
				     $scope.shippingAddress='';*/ 	
												} 
				
				else {
					alert('shippingaddress Addition Failed!');
				       }
			});
		};
		
	   			
                           	     }]);

			  



			                            			  	  

 app.controller('newcustomerctrl', [ '$scope', '$route','$routeParams','$rootScope','$http',
			                    			 function($scope,$route,$routeParams,$rootScope, $http) {
	$scope.title="New Customer";
	$scope.customers={};
	
	 $scope.savecustomer = function(){
		 $scope.customers.role="USER";	
			
			$http({
				method: 'POST',
				url : '/savecustomer',
				data : $scope.customers
			}).then(function(response){
				if(response.data.status){
					alert('Customer Added Successfully!');
					
					
												} 
				
				else {
					alert('Customer Addition Failed!');
				       }
			});
		};
		
		
		
	
	} ]);
 
 
 

 
 

 
 
 
  app.controller('editshippingctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
	     function($scope,$route,$routeParams,$rootScope, $http)
	     {
	  
	  $http({
			method : 'GET',
			url : '/displaystate',     
		
		}).then(function(response) {
			$rootScope.statevat = response.data;
			
	});
	  
	  
	  
			 
	  $http({
 			
		   method : 'GET',
	                           			
	                           			
	       url : '/shippingaddress/'+$routeParams.id,
	                           			
	        }).then(function(response) {
	                           			$scope.edit1 = angular.copy(response.data);
	                           			 
	                           		});
	                           	    
	                           	    
	                     		
	    $scope.editShipping = function(){	
				
	  		 $http({
	  				method: 'POST',
	  				url : '/editshippingaddress',
	  				data : $scope.edit1,
	  			
	  			}).then(function(response){
	  				if(response.data.status){
	  					alert('Address edit Successfully!');
	  					$scope.edit1= {};
	  					
	  				} else {
	  					alert('Address edit Failed!');
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
                           	 		url : '/categories',     
                           	 	
                           	 	}).then(function(response) {
                           	 		$rootScope.categories = response.data;
                           	 		
                           	 	});
                           	    	
                           	    	
                           	    	$http({
                               	 		method : 'GET',
                               	 		url : '/brands',     
                               	 	
                               	 	}).then(function(response) {
                               	 		$rootScope.brands = response.data;
                               	 		
                               	 	});
                           	    	
                           	    	
                           	    	
                             	     $http({
                                  			
                             	   	   method : 'GET',
                             	                              			
                             	                              			
                             	          url : '/products/'+$routeParams.id,
                             	                              			
                             	           }).then(function(response) {
                             	                              			$scope.product = angular.copy(response.data);
                             	                              			 
                             	                              		});
                             	    	 
                             	    	 $scope.editproduct = function(){	
                             				
                             	   		 $http({
                             	   				method: 'POST',
                             	   				url : '/saveproduct',
                             	   				data : $scope.product,
                             	   			
                             	   			}).then(function(response){
                             	   				if(response.data.status){
                             	   					alert('product edit Successfully!');
                             	   					//$scope.edit= {};
                             	   					
                             	   				} else {
                             	   					alert('product edit Failed!');
                             	   				}
                             	   			});
                             	   			};   
                             	      }]);
 
 
 app.controller('addproductctrl', [ '$scope','$route','$routeParams', '$rootScope','$http',
                          	     function($scope,$route,$routeParams,$rootScope, $http){
    
	
	 
	 $http({
			method : 'GET',
			url : '/categories',     
		
		}).then(function(response) {
			$rootScope.categories = response.data;
			
	})
	
	$http({
			method : 'GET',
			url : '/brands',     
		
		}).then(function(response) {
			$rootScope.brands = response.data;
			
	})

	
	 $scope.product={
			 /*category:{
				 
			 }
	 
	          brands:{
	         }
			 */
	 
	 }
	/* $scope.categories=[{"categoryName":"shirt"
		 
	 }]*/
	 $scope.saveproduct = function(){
			
			
			$http({
				method: 'POST',
				url : '/saveproduct',
				data : $scope.product
			}).then(function(response){
				if(response.data.status){
					alert('product Added Successfully!');
					
					
												} 
				
				else {
					alert('product Addition Failed!');
				       }
			});
		};
		
		
		
                                                             
 }])
 app.controller('gridctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                           	     function($scope,$route,$routeParams,$rootScope, $http)
                           	     {
	
	
	 $scope.images=[
	                {
	                  "id": "1",
	                  "imageUrl": "4.jpg",
	                  "price":"343534",
	                  "name": "Ara1",
	                 },
	                  {
	                  "id": "2",
	                  "imageUrl": "5.jpg",
	                  "price":"34534",
	                  "name": "Ara2",
	                 }*//*,
	                  {
	                  "id": "3",
	                  "imageUrl": "4.jpg",
	                  "price":"335434",
	                  "name": "Ara3",
	                 },
	                  {
	                  "id": "3",
	                  "imageUrl": "6.jpg",
	                  "price":"335434",
	                  "name": "Ara3",
	                 } ,{
	                  "id": "3",
	                  "imageUrl": "6.jpg",
	                  "price":"335434",
	                  "name": "Ara3",
	                 }, {
	                  "id": "3",
	                  "imageUrl": "6.jpg",
	                  "price":"335434",
	                  "name": "Ara3",
	                 }
	                
	              ]
	               
	             $scope.title="List Of Products";
	

                          			  
                          			  
 
/*	 $http({
			method : 'GET',
			url : '/products',
			
		}).then(function(response) {
			$rootScope.product = angular.copy(response.data);
			 
		});
           */           
                           	     
		$http({
			method : 'GET',
			url : '/products',	
		}).then(function(response) {
		
			$rootScope.products = angular.copy(response.data);		 
		});
	                          			  }]);
 


/*}]);*/
 
 
 app.controller('listctrl', [ '$scope','$route','$routeParams', '$rootScope','$http',
                          	     function($scope,$route,$routeParams,$rootScope, $http){
    
	 
	 $http({
			method : 'GET',
			url : '/products'
		}).then(function(response) {
			$rootScope.products = response.data;
	});
                                                             
 }])
app.controller('cartctrl', [ '$scope','$route','$routeParams', '$rootScope','$http',
                                                   	     function($scope,$route,$routeParams,$rootScope, $http)
                                                	     {
 /*  $scope.images=[
  {
    "id": "1",
    "imageUrl": "1.jpg",
    "price":"343534",
    "name": "Ara1",
    "quantity":1
   },
    {
    "id": "2",
    "imageUrl": "1.jpg",
    "price":"34534",
    "name": "Ara2",
     "quantity":2
   }
   ]*/
   
   /*$scope.shippingAddresses=[
     {
       "id":"1",
       "address1":"indu aranya",
       "address2":"nagole hyd",
       "city":"hyd",
       "phone":"5555555555",
       "pin":"4545456",
       "state":"telangana"
     },
      {
        "id":"2",
       "address1":"indu aranya",
       "address2":"nagole hyd",
       "city":"hyd",
       "phone":"5555555555",
       "pin":"4545456",
       "state":"telangana"
     },
   ]*/
  /*  $scope.addShipping=function(){
            $scope.shippingAddresses.push($scope.shippingAddress);
             $scope.shippingAddress='';*/
	
	
	
	
	//$scope.cart={};
	
	 
	  $http({
			
		   method : 'GET',
	                           			
	                           			
	       url : '/cart',
	                           			
	        }).then(function(response) {
	                           			$scope.cart = angular.copy(response.data);
	                           			
	                           		});
	  
	  
	  
    
 }])
 
 
 
 
 
 app.controller('cartitemctrl', [ '$scope','$route','$routeParams', '$rootScope','$http',
                               	     function($scope,$route,$routeParams,$rootScope, $http){
	 
	 $http({
			method : 'GET',
			url : '/products'
		}).then(function(response) {
			$rootScope.products = response.data;
	});
	 
 }])
 

