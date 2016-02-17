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
			
				$location.path('/');
				
					}		
		
	
		else{
			$rootScope.authenticated = false;
			alert('authentication failed');
			alert($rootScope.authenticated);
		}
	
})

$rootScope.logOut= function(){
	alert('entered into logout')
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

alert($rootScope.user);
	}
else
	{
	$rootScope.admin=true;
	$rootScope.user=false;

	alert($rootScope.admin);
	}
			
				$location.path('/');
				
				
		}, function(response){
			$rootScope.authenticated = false;
			alert('authentication failed');
			alert($rootScope.authenticated);
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
    
    
}])


			 
app.controller('editcustomerctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                           	     function($scope,$route,$routeParams,$rootScope, $http)
                           	     {
                           			 
                           	    /*$scope.title=' Edit Customer!!!';
                           	    
                           	    $http({
                           			method : 'GET',
                           			url : '/customers/'+$routeParams.id,
                           			
                           		}).then(function(response) {
                           			$rootScope.edit = angular.copy(response.data);
                           			 
                           		});
                           	    
                           	    
                           		 $rootScope.edit={
                           				 customers:{
                           					 
                           				 }
                           		 }
                           		$scope.savedetails = function(){	
                           							
                           		 $http({
                           				method: 'POST',
                           				url : '/savedetails',
                           				data : $rootScope.edit,
                           			
                           			}).then(function(response){
                           				if(response.data.status){
                           					alert('customer edit Successfully!');
                           					$rootScope.edit= {};
                           					
                           				} else {
                           					alert('customer edit Failed!');
                           				}
                           			});
                           			};
                           			 $scope.addEntry=function(){
            $scope.shippingAddresses.push($scope.shippingAddress);
             $scope.shippingAddress='';
    }
                           			*/
	
	
	
	
	$scope.shippingAddress={};

	 $scope.addShipping = function(){
			
			
			$http({
				method: 'POST',
				url : '/addshippingaddress',
				data : $scope.shippingAddress
			}).then(function(response){
				if(response.data.status){
					alert('shippingaddress Added Successfully!');
					
					
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
		 $scope.customers.role="ADMIN";	
			
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

