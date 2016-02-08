var app = angular.module('app', ['ngRoute']);

app.config([
		'$httpProvider',
		function($httpProvider) {
			$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		} ]);
app.config(['$routeProvider',
         function($routeProvider) {
           $routeProvider
<<<<<<< HEAD
           .when('/login', {
               templateUrl: 'login.html',
               controller: 'loginctrl'
           })   
              .when('/viewprofile', {
=======
           .when('/view', {
               templateUrl: 'viewprofile.html',
               controller: 'viewprofilectrl'
             })
              .when('/view', {
>>>>>>> branch 'master' of https://github.com/deepanjan0604/OnlineShoppingApplication.git
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
         }]);
		 
		 

app.controller('loginctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
function($scope,$route,$routeParams,$rootScope, $http)
{
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