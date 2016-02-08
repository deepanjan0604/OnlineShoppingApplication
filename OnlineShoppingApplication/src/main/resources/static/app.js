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
            

           .when('/view', {
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
         }]);
		 
		 

app.controller('loginctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
function($scope,$route,$routeParams,$rootScope, $http)
{
	
	/* 
	 * security 
	 * app.run(function($rootScope, $http){
		
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
					
					$rootScope.authenticated = true;
			});
			};
		});*/
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
			                    			                            			  }]);
 
 
 app.controller('aboutctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
 			 function($scope,$route,$routeParams,$rootScope, $http)
 			                            	     {
 			                            			  }])
 			                            			  
  
 app.controller('contactctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
 			 function($scope,$route,$routeParams,$rootScope, $http)
 			                            	     {
 
 			                            	     }])
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