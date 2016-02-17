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

           .when('/gridview', {
         templateUrl: 'gridview.html',
         controller: 'gridctrl'
       })
      .when('/cart', {
        templateUrl: 'Cart.html',
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
			    
             .when('/editproduct', {
                 templateUrl: 'editproduct.html',
                 controller: 'editproductctrl'
               })
              
             
               
               
              .when('/viewcustomer', {
               templateUrl: 'viewcustomer.html',
               controller: 'viewcustomerctrl'
             })
             .when('/addproducts', {
                   templateUrl: 'addproduct.html',
                   controller: 'addproductctrl'
                 }) 
                 
                 
                 .otherwise({
                     redirectTo: '/home'
                   })
                   
         }]);

app.run(function($rootScope, $http){
	
	$http({
		method : 'GET',
		url : '/categories',     
	
	}).then(function(response) {
		$rootScope.categories = response.data;
		
})
})


		 
/*app.run(function($rootScope, $http){
	*/
	/*<html>
	 <head>
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script>
	function switchVisible() {
	            if (document.getElementById('Div1')) {

	                if (document.getElementById('Div1').style.display == 'none') {
	                    document.getElementById('Div1').style.display = 'block';
	                    document.getElementById('Div2').style.display = 'none';
	                }
	                else {
	                    document.getElementById('Div1').style.display = 'none';
	                    document.getElementById('Div2').style.display = 'block';
	                }
	            }
	}
	</script> 
	<style>
	#Div2 {
	  display: none;
	}
	</style>
	     </head>
	        <body>

	<div id="Div1">Div 1</div>
	<div id="Div2">Div 2</div>

	<input id="Button1" type="button" value="Click" onclick="switchVisible();"/>
	     </body>
	    </html>*/
	
/*	$rootScope.loadCustomers = function(auth) {
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
				url : '/customers',     
				headers : headers
			}).then(function(response) {
				$rootScope.users = response.data;
				$rootScope.authenticated = true;
				$rootScope.authenticated1=false;
		});
		};
	});	 */

app.controller('loginctrl',[ '$scope', '$rootScope','$http', '$location', function($scope,$rootScope, $http, $location)
{

//	$scope.auth = {};
//	$scope.login = function(){
//		$rootScope.loadCustomers($scope.auth);
//	}
	
	$scope.login = function() {
		/*if(auth)
			{*/
			var authData = $scope.auth.username + ':' + $scope.auth.password;
		var encodedAuthData = btoa(authData);
		/*var headers = {
				'Authorization' : 'Basic ' + encodedAuthData
				}
			} else {
				headers : {};
			}*/
			$http({
				method : 'GET',
				url : '/products',     
				headers : {'Authorization' : 'Basic ' + encodedAuthData}
			}).then(function(response) {
				
				$rootScope.products = response.data;
				
				$rootScope.authenticated = true;
				
				$location.path('/');
				alert($rootScope.authenticated);
				$rootScope.authenticated1=false;
		}, function(response){
			
		});
	}
}]);		 


/*app.controller('productctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                          	     function($scope,$route,$routeParams,$rootScope, $http)
                          	     {
	$scope.products={};
	$http({
		method : 'GET',
		url : '/products',
		
	}).then(function(response) {
		$rootScope.products = angular.copy(response.data);
		 
	});
                          			  }]);
*/



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
}])


			 
app.controller('editcustomerctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                           	     function($scope,$route,$routeParams,$rootScope, $http)
                           	     {
                           			 
    $scope.title=' Edit Customer!!!';
                           	    
    /*$scope.edit=
	                {
	                  "firstName": "hhh",
	                  "lastName": "gdfgsdf",
	                  "userName":"gfgh",
	                  "emailId": "hjk@jkhjk"
	                
	                 }      */                   	    
   
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
  					$scope.edit= {};
  					
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

	 $scope.addShipping = function(){
		
			$http({
				method: 'POST',
				url : '/addshippingaddress',
				data : $scope.shippingAddress
			}).then(function(response){
				if(response.data.status){
					alert('shippingaddress Added Successfully!');
					
					
					$scope.shippingAddresses.push($scope.shippingAddress);
						
					
				     $scope.shippingAddress=''; 	
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
			  }]);		
 
  
  
 
 

 
 
 app.controller('editproductctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                           	     function($scope,$route,$routeParams,$rootScope, $http)
                           	     {
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
				 
			 }*/
	 
	         /* brands:{
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
	                 },
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
                           			  }]);
 
 
 app.controller('listctrl', [ '$scope','$route','$routeParams', '$rootScope','$http',
                          	     function($scope,$route,$routeParams,$rootScope, $http){
    
                                                             
 }])
.controller('cartctrl', ['$scope', function($scope) { 
   $scope.images=[
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
   ]
   
   $scope.shippingAddresses=[
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
   ]
    $scope.addShipping=function(){
            $scope.shippingAddresses.push($scope.shippingAddress);
             $scope.shippingAddress='';
    }
 }])

