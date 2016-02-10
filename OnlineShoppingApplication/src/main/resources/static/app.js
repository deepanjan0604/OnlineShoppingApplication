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

          
   
              .when('/viewprofile', {
               templateUrl: 'viewprofile.html',
               controller: 'viewprofilectrl'
             })
              

             .when('/editprofile', {
                 templateUrl: 'editprofile.html',
                 controller: 'editprofiectrl'
               })
               .when('/history', {
                 templateUrl: 'history.html',
                 controller: 'historyctrl'
               })
               .when('/orderhistory', {
                 templateUrl: 'orderhistory.html',
                 controller: 'orderhistoryctrl'
               })
               .when('/newcustomer', {
                 templateUrl: 'newcustomer.html',
                 controller: 'newcustomerctrl'
               })
               
               .when('/about', {
                 templateUrl: 'about.html',
                 controller: 'aboutctrl'
               })
               
               
               .when('/contact', {
                 templateUrl: 'contact.html',
                 controller: 'contactctrl'
               })
               
                .when('/editshipping', {
                 templateUrl: 'editshipping.html',
                 controller: 'editshippingctrl'
               })
			    .when('/addshipping', {
                 templateUrl: 'addshipping.html',
                 controller: 'addshippingctrl'
               })
               .when('/addproduct', {
                 templateUrl: 'addproduct.html',
                 controller: 'addproductctrl'
               })
               .when('/editproduct', {
                 templateUrl: 'editproduct.html',
                 controller: 'editproductctrl'
               })
               .when('/orderhistory', {
                 templateUrl: 'orderhistory.html',
                 controller: 'orderhistoryctrl'
               })
               .when('/product', {
                 templateUrl: 'viewproducts.html',
                 controller: 'productctrl'
               })
         }]);
		 
app.run(function($rootScope, $http){
	
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
	$rootScope.loadCustomers = function(auth) {
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
	});	 

app.controller('loginctrl',[ '$scope', '$rootScope','$http',
function($scope,$rootScope, $http)
{

	$scope.auth = {};
	$scope.login = function(){
		$rootScope.loadCustomers($scope.auth);
	}
}]);		 


app.controller('productctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
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


app.controller('viewprofilectrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
	     function($scope,$route,$routeParams,$rootScope, $http)
	     {
			 $scope.title="msgggggg";
			  }]);




			 
app.controller('editprofilectrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
	     function($scope,$route,$routeParams,$rootScope, $http)
	     {
			  }]);



			  
app.controller('historyctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
			 function($scope,$route,$routeParams,$rootScope, $http)
			                            	     {
			                            			  }]);


			                            			  	  

 app.controller('newcustomerctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
			                    			 function($scope,$route,$routeParams,$rootScope, $http)
			                 {
	 
	/*
	 app.controller('myctrl', ['$scope', function($scope){ 
			                 }
	 */$scope.input={
				customerId:{
				}
	};

	 $scope.savecustomer = function(){
			
			
			$http({
				method: 'POST',
				url : '/savecustomer',
				data : $scope.input
			}).then(function(response){
				if(response.data.status){
					alert('Customer Added Successfully!');
					$rootScope.customers = {};
					$rootScope.users = {};
					//$rootScope.customer.push($rootScope.customers);
					//$rootScope.customers.push($rootScope.users);
					
					
				} else {
					alert(Customer Addition Failed!');
				}
			});
	  }]);
 
 
 
 
 app.controller('aboutctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
 			 function($scope,$route,$routeParams,$rootScope, $http)
 			                            	     {
 			                            			  }]);
 
 			                            			  
  
 app.controller('contactctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
 			 function($scope,$route,$routeParams,$rootScope, $http)
 			                            	     {
 
 			                            	     }]);
 
 
 
  app.controller('editshippingctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
	     function($scope,$route,$routeParams,$rootScope, $http)
	     {
			  }]);		
 
  
  
 
 
 app.controller('addshippingctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
	     function($scope,$route,$routeParams,$rootScope, $http)
	     {
			  }]);
 
 
 app.controller('editproductctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                           	     function($scope,$route,$routeParams,$rootScope, $http)
                           	     {
                           			  }]);
 
 
 
 
 app.controller('addproductctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                              	     function($scope,$route,$routeParams,$rootScope, $http)
                              	     {
                              			  }]);
 

 app.controller('orderhistoryctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
                   			 function($scope,$route,$routeParams,$rootScope, $http)
                   			                            	     {
                   			                            			  }]);

